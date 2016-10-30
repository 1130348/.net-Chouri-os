using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Lugares.DAL;
using Lugares.Models;

namespace Lugares.Controllers
{
    public class PoiController : Controller
    {
        private LugaresContext db = new LugaresContext();

        // GET: Poi
        public ActionResult Index()
        {
            return View(db.Pois.ToList());
        }

        // GET: Poi/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Poi poi = db.Pois.Find(id);
            if (poi == null)
            {
                return HttpNotFound();
            }
            return View(poi);
        }

        // GET: Poi/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Poi/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Nome, Descricao")]Poi poi)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    db.Pois.Add(poi);
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
            }
            catch (DataException /* dex */)
            {
                //Log the error (uncomment dex variable name and add a line here to write a log.
                ModelState.AddModelError("", "Unable to save changes. Try again, and if the problem persists see your system administrator.");
            }

            return View(poi);
        }

        // GET: Poi/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Poi poi = db.Pois.Find(id);
            if (poi == null)
            {
                return HttpNotFound();
            }
            return View(poi);
        }

        // POST: Poi/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost, ActionName("Edit")]
        [ValidateAntiForgeryToken]
        public ActionResult EditPost(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var poiToUpdate = db.Pois.Find(id);
            if (TryUpdateModel(poiToUpdate, "",
               new string[] { "Nome", "Descricao" }))
            {
                try
                {
                    db.SaveChanges();

                    return RedirectToAction("Index");
                }
                catch (DataException /* dex */)
                {
                    //Log the error (uncomment dex variable name and add a line here to write a log.
                    ModelState.AddModelError("", "Unable to save changes. Try again, and if the problem persists, see your system administrator.");
                }
            }
            return View(poiToUpdate);
        }

        // GET: Poi/Delete/5
        public ActionResult Delete(int? id, bool? saveChangesError = false)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            if (saveChangesError.GetValueOrDefault())
            {
                ViewBag.ErrorMessage = "Delete failed. Try again, and if the problem persists see your system administrator.";
            }
            Poi poi = db.Pois.Find(id);
            if (poi == null)
            {
                return HttpNotFound();
            }
            return View(poi);
        }

        // POST: Poi/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
            try
            {
                Poi poi = db.Pois.Find(id);
                db.Pois.Remove(poi);
                db.SaveChanges();
            }
            catch (DataException/* dex */)
            {
                //Log the error (uncomment dex variable name and add a line here to write a log.
                return RedirectToAction("Delete", new { id = id, saveChangesError = true });
            }
            return RedirectToAction("Index");
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
