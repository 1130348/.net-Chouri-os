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
    [Authorize(Roles = "Editor")]
    public class POIController : Controller
    {
        private Datum db = new Datum();

        // GET: POI
        public ActionResult Index(string sortOrder, string currentFiltrer, string searchString, int? page)
        {

            ViewBag.NameSortParm = String.IsNullOrEmpty(sortOrder) ? "nome_ponto_desc" : "";
            ViewBag.LocalSortParm = String.IsNullOrEmpty(sortOrder) ? "nome_local_desc" : "nome_local_asc";
            ViewBag.DescricaoSortParm = String.IsNullOrEmpty(sortOrder) ? "descricao_ponto_desc" : "descricao_ponto_asc";

            if (searchString != null)
            {
                page = 1;
            }
            else
            {
                searchString = currentFiltrer;
            }

            ViewBag.CurrentFilter = searchString;

            var pontos = from p in db.PontosDeInteresse
                         select p;

            if (!String.IsNullOrEmpty(searchString))
            {
                pontos = pontos.Where(p => p.Local.NomeLocal.Contains(searchString));
            }

            switch (sortOrder)
            {
                case "nome_ponto_desc":
                    pontos = pontos.OrderByDescending(p => p.NomePonto);
                    break;
                case "nome_local_desc":
                    pontos = pontos.OrderByDescending(p => p.Local.NomeLocal);
                    break;
                case "nome_local_asc":
                    pontos = pontos.OrderBy(p => p.Local.NomeLocal);
                    break;
                case "descricao_ponto_desc":
                    pontos = pontos.OrderByDescending(p => p.DescricaoPonto);
                    break;
                case "descricao_ponto_asc":
                    pontos = pontos.OrderBy(p => p.DescricaoPonto);
                    break;
                default:
                    pontos = pontos.OrderBy(p => p.NomePonto);
                    break;
            }

            int pageSize = 5; // Quantidade de locais por página.
            int pageNumber = (page ?? 1);
            return View(pontos.ToPagedList(pageNumber, pageSize));
        }

        // GET: POI/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            POI pOI = db.PontosDeInteresse.Find(id);
            if (pOI == null)
            {
                return HttpNotFound();
            }
            return View(pOI);
        }

        // GET: POI/Create
        public ActionResult Create()
        {
            ViewBag.LocalID = new SelectList(db.Locais, "LocalID", "NomeLocal");
            return View();
        }

        // POST: POI/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "LocalID,NomePonto,DescricaoPonto")] POI pOI)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    db.PontosDeInteresse.Add(pOI);
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }

                ViewBag.LocalID = new SelectList(db.Locais, "LocalID", "NomeLocal", pOI.LocalID);
            }
            catch (DataException /* dex */)
            {
                // Log the error
                ModelState.AddModelError("", "Unable to save changes. Try again, and if the problem persists see your system administrator.");
            }
            return View(pOI);
        }

        // GET: POI/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            POI pOI = db.PontosDeInteresse.Find(id);
            if (pOI == null)
            {
                return HttpNotFound();
            }
            ViewBag.LocalID = new SelectList(db.Locais, "LocalID", "NomeLocal", pOI.LocalID);
            return View(pOI);
        }

        // POST: POI/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,LocalID,NomePonto,DescricaoPonto")] POI pOI)
        {
            if (ModelState.IsValid)
            {
                db.Entry(pOI).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.LocalID = new SelectList(db.Locais, "LocalID", "NomeLocal", pOI.LocalID);
            return View(pOI);
        }

        // GET: POI/Delete/5
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
            POI pOI = db.PontosDeInteresse.Find(id);
            if (pOI == null)
            {
                return HttpNotFound();
            }
            return View(pOI);
        }

        // POST: POI/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
            try
            {
                POI ponto = db.PontosDeInteresse.Find(id);
                db.PontosDeInteresse.Remove(ponto);
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
