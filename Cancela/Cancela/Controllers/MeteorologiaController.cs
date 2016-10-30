using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Cancela.Models;

namespace Cancela.Controllers
{
    public class MeteorologiaController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Meteorologia
        public IQueryable<Meteorologia> GetMeteorologias()
        {
            return db.Meteorologias;
        }

        // GET: api/Meteorologia/5
        [ResponseType(typeof(Meteorologia))]
        public async Task<IHttpActionResult> GetMeteorologia(int id)
        {
            Meteorologia meteorologia = await db.Meteorologias.FindAsync(id);
            if (meteorologia == null)
            {
                return NotFound();
            }

            return Ok(meteorologia);
        }

        // PUT: api/Meteorologia/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutMeteorologia(int id, Meteorologia meteorologia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != meteorologia.ID)
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

        // POST: api/Meteorologia
        [ResponseType(typeof(Meteorologia))]
        public async Task<IHttpActionResult> PostMeteorologia(Meteorologia meteorologia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Meteorologias.Add(meteorologia);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = meteorologia.ID }, meteorologia);
        }

        // DELETE: api/Meteorologia/5
        [ResponseType(typeof(Meteorologia))]
        public async Task<IHttpActionResult> DeleteMeteorologia(int id)
        {
            Meteorologia meteorologia = await db.Meteorologias.FindAsync(id);
            if (meteorologia == null)
            {
                return NotFound();
            }

            db.Meteorologias.Remove(meteorologia);
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
            return db.Meteorologias.Count(e => e.ID == id) > 0;
        }
    }
}