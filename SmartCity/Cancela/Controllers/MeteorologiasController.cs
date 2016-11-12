using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Lugares.DAL;
using ModelLibrary.Models;
using Cancela.Models;

namespace Cancela.Controllers
{
    public class MeteorologiasController : ApiController
    {
        private Datum db = new Datum();

        // GET: api/Meteorologias
        public IQueryable<MeteorologiaDTO> GetRegistosMeteorologicos()
        {
            var registosMeteorologicos = from m in db.RegistosMeteorologicos
                                         select new MeteorologiaDTO()
                                         {
                                             MeteorologiaID = m.MeteorologiaID,
                                             DataDeLeitura = m.DataDeLeitura,
                                             HoraDeLeitura = m.HoraDeLeitura,
                                             Temperatura = m.Temperatura,
                                             Vento = m.Vento,
                                             Humidade = m.Humidade,
                                             Pressao = m.Pressao,
                                             NO = m.NO,
                                             NO2 = m.NO2,
                                             CO2 = m.CO2,
                                             NomeLocal = m.Local.NomeLocal
                                         };

            return registosMeteorologicos;
        }

        // GET: api/Meteorologias/5
        [ResponseType(typeof(Meteorologia))]
        public async Task<IHttpActionResult> GetMeteorologia(int id)
        {
            Meteorologia meteorologia = await db.RegistosMeteorologicos.FindAsync(id);
            if (meteorologia == null)
            {
                return NotFound();
            }

            return Ok(meteorologia);
        }

        // PUT: api/Meteorologias/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutMeteorologia(int id, Meteorologia meteorologia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != meteorologia.MeteorologiaID)
            {
                return BadRequest();
            }

            db.Entry(meteorologia).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MeteorologiaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Meteorologias
        [ResponseType(typeof(Meteorologia))]
        public async Task<IHttpActionResult> PostMeteorologia(Meteorologia meteorologia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RegistosMeteorologicos.Add(meteorologia);
            await db.SaveChangesAsync();

            var dto = new MeteorologiaDTO()
            {
                MeteorologiaID = meteorologia.MeteorologiaID,
                DataDeLeitura = meteorologia.DataDeLeitura,
                HoraDeLeitura = meteorologia.HoraDeLeitura,
                Temperatura = meteorologia.Temperatura,
                Vento = meteorologia.Vento,
                Humidade = meteorologia.Humidade,
                Pressao = meteorologia.Pressao,
                NO = meteorologia.NO,
                NO2 = meteorologia.NO2,
                CO2 = meteorologia.CO2,
                NomeLocal = meteorologia.Local.NomeLocal
            };

            return CreatedAtRoute("DefaultApi", new { id = meteorologia.MeteorologiaID }, dto);
        }

        // DELETE: api/Meteorologias/5
        [ResponseType(typeof(Meteorologia))]
        public async Task<IHttpActionResult> DeleteMeteorologia(int id)
        {
            Meteorologia meteorologia = await db.RegistosMeteorologicos.FindAsync(id);
            if (meteorologia == null)
            {
                return NotFound();
            }

            db.RegistosMeteorologicos.Remove(meteorologia);
            await db.SaveChangesAsync();

            return Ok(meteorologia);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MeteorologiaExists(int id)
        {
            return db.RegistosMeteorologicos.Count(e => e.MeteorologiaID == id) > 0;
        }
    }
}