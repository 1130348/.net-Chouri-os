using System;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using Lugares.DAL;
using PagedList;
using ModelLibrary.Models;

namespace Lugares.Controllers
{
    public class MeteorologiaController : Controller
    {
        private Datum db = new Datum();

        // GET: Meteorologia
        public ActionResult Index(string sortOrder, string currentFiltrer, string searchString, int? page)
        {
            ViewBag.CurrentSort = sortOrder;
            ViewBag.DateSortParm = sortOrder == "Date" ? "date_desc" : "";

            if (searchString != null)
            {
                page = 1;
            }
            else
            {
                searchString = currentFiltrer;
            }

            ViewBag.CurrentFilter = searchString;

            var registosMeteorologicos = from m in db.RegistosMeteorologicos
                                         select m;

            if (!String.IsNullOrEmpty(searchString))
            {
                registosMeteorologicos = registosMeteorologicos.Where(m => m.Local.NomeLocal.Contains(searchString));
            }

            switch (sortOrder)
            {
                case "date_desc":
                    registosMeteorologicos = registosMeteorologicos.OrderByDescending(m => m.DataDeLeitura);
                    break;
                default:
                    registosMeteorologicos = registosMeteorologicos.OrderBy(m => m.DataDeLeitura);
                    break;
            }

            int pageSize = 5; // Quantidade de locais por página.
            int pageNumber = (page ?? 1);
            return View(registosMeteorologicos.ToPagedList(pageNumber, pageSize));
        }

        // GET: Meteorologia/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Meteorologia meteorologia = db.RegistosMeteorologicos.Find(id);
            if (meteorologia == null)
            {
                return HttpNotFound();
            }
            return View(meteorologia);
        }

        // GET: Meteorologia/Create
        public ActionResult Create()
        {
            ViewBag.LocalID = new SelectList(db.Locais, "LocalID", "NomeLocal");
            return View();
        }

        // POST: Meteorologia/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "LocalID,DataDeLeitura,HoraDeLeitura,Temperatura,Vento,Humidade,Pressao,NO,NO2,CO2")] Meteorologia meteorologia)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    db.RegistosMeteorologicos.Add(meteorologia);
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }

                ViewBag.LocalID = new SelectList(db.Locais, "LocalID", "NomeLocal", meteorologia.LocalID);
            }
            catch (DataException /* dex */)
            {
                // Log the error
                ModelState.AddModelError("", "Unable to save changes. Try again, and if the problem persists see your system administrator.");
            }

            return View(meteorologia);
        }

        // GET: Meteorologia/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Meteorologia meteorologia = db.RegistosMeteorologicos.Find(id);
            if (meteorologia == null)
            {
                return HttpNotFound();
            }
            ViewBag.LocalID = new SelectList(db.Locais, "LocalID", "NomeLocal", meteorologia.LocalID);
            return View(meteorologia);
        }

        // POST: Meteorologia/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "MeteorologiaID,LocalID,DataDeLeitura,HoraDeLeitura,Temperatura,Vento,Humidade,Pressao,NO,NO2,CO2")] Meteorologia meteorologia)
        {
            if (ModelState.IsValid)
            {
                db.Entry(meteorologia).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.LocalID = new SelectList(db.Locais, "LocalID", "NomeLocal", meteorologia.LocalID);
            return View(meteorologia);
        }

        // GET: Meteorologia/Delete/5
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

            Meteorologia meteorologia = db.RegistosMeteorologicos.Find(id);
            if (meteorologia == null)
            {
                return HttpNotFound();
            }
            return View(meteorologia);
        }

        // POST: Meteorologia/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
            try
            {
                Meteorologia meteorologia = db.RegistosMeteorologicos.Find(id);
                db.RegistosMeteorologicos.Remove(meteorologia);
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
