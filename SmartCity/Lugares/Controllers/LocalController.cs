using System;
using System.Data;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using Lugares.DAL;
using PagedList;
using ModelLibrary.Models;

namespace Lugares.Controllers
{
    [Authorize(Roles = "Editor")]
    public class LocalController : Controller
    {
        private Datum db = new Datum();

        // GET: Local
        public ActionResult Index(string sortOrder, string currentFiltrer, string searchString, int? page)
        {
            ViewBag.CurrentSort = sortOrder;
            ViewBag.NameSortParm = String.IsNullOrEmpty(sortOrder) ? "name_desc" : "";

            if (searchString != null)
            {
                page = 1;
            }
            else
            {
                searchString = currentFiltrer;
            }

            ViewBag.CurrentFilter = searchString;

            var locais = from l in db.Locais
                         select l;

            if (!String.IsNullOrEmpty(searchString))
            {
                locais = locais.Where(l => l.NomeLocal.Contains(searchString));
            }

            switch (sortOrder)
            {
                case "name_desc":
                    locais = locais.OrderByDescending(l => l.NomeLocal);
                    break;
                default:
                    locais = locais.OrderBy(l => l.NomeLocal);
                    break;
            }
            int pageSize = 5; 
            int pageNumber = (page ?? 1);
            return View(locais.ToPagedList(pageNumber, pageSize));
        }

        // GET: Local/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Local local = db.Locais.Find(id);
            if (local == null)
            {
                return HttpNotFound();
            }
            return View(local);
        }

        // GET: Local/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Local/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "GPS_Lat,GPS_Long,NomeLocal")] Local local)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    db.Locais.Add(local);
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
            }
            catch (DataException /* dex */)
            {
                // Log the error
                ModelState.AddModelError("", "Unable to save changes. Try again, and if the problem persists see your system administrator.");
            }


            return View(local);
        }

        // GET: Local/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Local local = db.Locais.Find(id);
            if (local == null)
            {
                return HttpNotFound();
            }
            return View(local);
        }


        // POST: Local/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        /*[HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "LocalID,GPS_Lat,GPS_Long,NomeLocal")] Local local)
        {
            if (ModelState.IsValid)
            {
                db.Entry(local).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(local);
        }*/

        // Método Edit a prevenir overposting.
        [HttpPost, ActionName("Edit")]
        [ValidateAntiForgeryToken]
        public ActionResult EditPost(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var localToUpdate = db.Locais.Find(id);
            if (TryUpdateModel(localToUpdate, "",
               new string[] { "GPS_Lat", "GPS_Long", "NomeLocal" }))
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
            return View(localToUpdate);
        }

        // GET: Local/Delete/5
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

            Local local = db.Locais.Find(id);
            if (local == null)
            {
                return HttpNotFound();
            }
            return View(local);
        }

        // POST: Local/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
            try
            {
                Local local = db.Locais.Find(id);
                db.Locais.Remove(local);
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
