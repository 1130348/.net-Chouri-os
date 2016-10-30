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
    public class MeteorologiaController : Controller
    {
        private LugaresContext db = new LugaresContext();

        // GET: Metereologia
        public ActionResult Index()
        {
            return View(db.Meteorologias.ToList());
        }

        // GET: Metereologia/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Meteorologia meteorologia = db.Meteorologias.Find(id);
            if (meteorologia == null)
            {
                return HttpNotFound();
            }
            return View(meteorologia);
        }

        // GET: Metereologia/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Metereologia/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Data_de_Leitura,Hora_de_Leitura,temp,vento,humidade,pressao,NO,NO2,CO2")]Meteorologia meteorologia)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    db.Meteorologias.Add(meteorologia);
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
            }
            catch (DataException /* dex */)
            {
                //Log the error (uncomment dex variable name and add a line here to write a log.
                ModelState.AddModelError("", "Unable to save changes. Try again, and if the problem persists see your system administrator.");
            }

            return View(meteorologia);
        }

        // GET: Metereologia/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Meteorologia meteorologia = db.Meteorologias.Find(id);
            if (meteorologia == null)
            {
                return HttpNotFound();
            }
            return View(meteorologia);
        }

        // POST: Metereologia/Edit/5
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
            var meteorologiaToUpdate = db.Meteorologias.Find(id);
            if (TryUpdateModel(meteorologiaToUpdate, "",
               new string[] { "GPS_Lat", "GPS_Long,Nome", "Nome" }))
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
            return View(meteorologiaToUpdate);
        }

        // GET: Metereologia/Delete/5
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
            Meteorologia meteorologia = db.Meteorologias.Find(id);
            if (meteorologia == null)
            {
                return HttpNotFound();
            }
            return View(meteorologia);
        }

        // POST: Metereologia/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
            try
            {
                Meteorologia meteorologia = db.Meteorologias.Find(id);
                db.Meteorologias.Remove(meteorologia);
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
