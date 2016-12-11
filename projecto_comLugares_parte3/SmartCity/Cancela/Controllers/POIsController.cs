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
using Microsoft.AspNet.Identity;

namespace Cancela.Controllers
{
    [Authorize(Roles = "Editor")]
    public class POIsController : ApiController
    {
        private Datum db = new Datum();

        // GET: api/POIs
        public IQueryable<POIDTO> GetPontosDeInteresse()
        {
            var pontos = from p in db.PontosDeInteresse
                         select new POIDTO()
                         {
                             PoiID = p.ID,
                             NomePonto = p.NomePonto,
                             DescricaoPonto = p.DescricaoPonto,
                             NomeLocal = p.Local.NomeLocal
                         };

            return pontos;
        }

        // GET: api/POIs/5
        [ResponseType(typeof(POI))]
        public async Task<IHttpActionResult> GetPOI(int id)
        {
            POI pOI = await db.PontosDeInteresse.FindAsync(id);
            if (pOI == null)
            {
                return NotFound();
            }

            return Ok(pOI);
        }

        // PUT: api/POIs/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPOI(int id, POI pOI)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (pOI.creator != User.Identity.GetUserName())
            {
                return BadRequest();
            }

            if (id != pOI.ID)
            {
                return BadRequest();
            }

            db.Entry(pOI).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!POIExists(id))
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

        // POST: api/POIs
        [ResponseType(typeof(POI))]
        public async Task<IHttpActionResult> PostPOI(POI pOI)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PontosDeInteresse.Add(pOI);
            await db.SaveChangesAsync();

            db.Entry(pOI).Reference(x => x.Local).Load();

            var dto = new POIDTO()
            {
                PoiID = pOI.ID,
                NomePonto = pOI.NomePonto,
                DescricaoPonto = pOI.DescricaoPonto,
                NomeLocal = pOI.Local.NomeLocal
            };
            pOI.creator = User.Identity.GetUserName();
            return CreatedAtRoute("DefaultApi", new { id = pOI.ID }, dto);
        }

        // DELETE: api/POIs/5
        [ResponseType(typeof(POI))]
        public async Task<IHttpActionResult> DeletePOI(int id)
        {
            POI pOI = await db.PontosDeInteresse.FindAsync(id);
            if (pOI.creator != User.Identity.GetUserName())
            {
                return BadRequest();
            }

            if (pOI == null)
            {
                return NotFound();
            }

            db.PontosDeInteresse.Remove(pOI);
            await db.SaveChangesAsync();

            return Ok(pOI);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool POIExists(int id)
        {
            return db.PontosDeInteresse.Count(e => e.ID == id) > 0;
        }
    }
}