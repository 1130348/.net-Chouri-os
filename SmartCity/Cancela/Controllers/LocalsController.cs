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
    public class LocalsController : ApiController
    {
        private Datum db = new Datum();

        // GET: api/Locals
        public IQueryable<LocalDTO> GetLocais()
        {
            var locais = from l in db.Locais
                         select new LocalDTO()
                         {
                             LocalID = l.LocalID,
                             GPS_Latitude = l.GPS_Lat,
                             GPS_Longitude = l.GPS_Long,
                             NomeLocal = l.NomeLocal
                         };

            return locais;
        }

        // GET: api/Locals/5
        [ResponseType(typeof(Local))]
        public async Task<IHttpActionResult> GetLocal(int id)
        {
            Local local = await db.Locais.FindAsync(id);
            if (local == null)
            {
                return NotFound();
            }

            return Ok(local);
        }

        // PUT: api/Locals/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutLocal(int id, Local local)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != local.LocalID)
            {
                return BadRequest();
            }

            db.Entry(local).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocalExists(id))
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

        // POST: api/Locals
        [ResponseType(typeof(Local))]
        public async Task<IHttpActionResult> PostLocal(Local local)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Locais.Add(local);
            await db.SaveChangesAsync();

            var dto = new LocalDTO()
            {
                LocalID = local.LocalID,
                GPS_Latitude = local.GPS_Lat,
                GPS_Longitude = local.GPS_Long,
                NomeLocal = local.NomeLocal
            };

            return CreatedAtRoute("DefaultApi", new { id = local.LocalID }, dto);
        }

        // DELETE: api/Locals/5
        [ResponseType(typeof(Local))]
        public async Task<IHttpActionResult> DeleteLocal(int id)
        {
            Local local = await db.Locais.FindAsync(id);
            if (local == null)
            {
                return NotFound();
            }

            db.Locais.Remove(local);
            await db.SaveChangesAsync();

            return Ok(local);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LocalExists(int id)
        {
            return db.Locais.Count(e => e.LocalID == id) > 0;
        }
    }
}