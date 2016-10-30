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
    public class PoiController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Poi
        public IQueryable<Poi> GetPois()
        {
            return db.Pois;
        }

        // GET: api/Poi/5
        [ResponseType(typeof(Poi))]
        public async Task<IHttpActionResult> GetPoi(int id)
        {
            Poi poi = await db.Pois.FindAsync(id);
            if (poi == null)
            {
                return NotFound();
            }

            return Ok(poi);
        }

        // PUT: api/Poi/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPoi(int id, Poi poi)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != poi.ID)
            {
                return BadRequest();
            }

            db.Entry(poi).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PoiExists(id))
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

        // POST: api/Poi
        [ResponseType(typeof(Poi))]
        public async Task<IHttpActionResult> PostPoi(Poi poi)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Pois.Add(poi);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = poi.ID }, poi);
        }

        // DELETE: api/Poi/5
        [ResponseType(typeof(Poi))]
        public async Task<IHttpActionResult> DeletePoi(int id)
        {
            Poi poi = await db.Pois.FindAsync(id);
            if (poi == null)
            {
                return NotFound();
            }

            db.Pois.Remove(poi);
            await db.SaveChangesAsync();

            return Ok(poi);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PoiExists(int id)
        {
            return db.Pois.Count(e => e.ID == id) > 0;
        }
    }
}