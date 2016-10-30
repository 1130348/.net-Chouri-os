using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Visita.Models;
using Visita.Helpers;
using System.Net.Http;
using Newtonsoft.Json;

namespace Visita.Controllers
{
    public class PoiController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Poi
        public async Task<ActionResult> Index()
        {
            var client = WebApiHttpClient.GetClient();
            HttpResponseMessage response = await client.GetAsync("api/Poi");
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                var poi =
                JsonConvert.DeserializeObject<IEnumerable<Poi>>(content);
                return View(poi);
            }
            else
            {
                return Content("Ocorreu um erro: " + response.StatusCode);
            }
        }

        // GET: Poi/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var client = WebApiHttpClient.GetClient();
            HttpResponseMessage response = await client.GetAsync("api/Poi/" + id);
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                var poi = JsonConvert.DeserializeObject<Poi>(content);
                if (poi == null) return HttpNotFound();
                return View(poi);
            }
            else
            {
                return Content("Ocorreu um erro: " + response.StatusCode);
            }
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
        public async Task<ActionResult> Create(
[Bind(Include = "Nome, Descricao")] Poi poi)
        {
            try
            {
                var client = WebApiHttpClient.GetClient();
                string editoraJSON = JsonConvert.SerializeObject(poi);
                HttpContent content = new StringContent(editoraJSON,
                System.Text.Encoding.Unicode, "application/json");
                var response = await client.PostAsync("api/Poi", content);
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction("Index");
                }
                else
                {
                    return Content("Ocorreu um erro: " + response.StatusCode);
                }
            }
            catch
            {
                return Content("Ocorreu um erro.");
            }
        }

        // GET: Poi/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var client = WebApiHttpClient.GetClient();
            HttpResponseMessage response = await client.GetAsync("api/Poi/" + id);
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                var poi = JsonConvert.DeserializeObject<Poi>(content);
                if (poi == null) return HttpNotFound();
                return View(poi);
            }
            return Content("Ocorreu um erro: " + response.StatusCode);
        }

        // POST: Poi/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(
[Bind(Include = "Nome, Descricao")] Poi poi)
        {
            try
            {
                var client = WebApiHttpClient.GetClient();
                string editoraJSON = JsonConvert.SerializeObject(poi);
                HttpContent content = new StringContent(editoraJSON,
                System.Text.Encoding.Unicode, "application/json");
                var response =
                await client.PutAsync("api/Poi/" + poi.ID, content);
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction("Index");
                }
                else
                {
                    return Content("Ocorreu um erro: " + response.StatusCode);
                }
            }
            catch
            {
                return Content("Ocorreu um erro.");
            }
        }

        // GET: Poi/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var client = WebApiHttpClient.GetClient();
            HttpResponseMessage response = await client.GetAsync("api/Poi/" + id);
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                var poi = JsonConvert.DeserializeObject<Poi>(content);
                if (poi == null) return HttpNotFound();
                return View(poi);
            }
            return Content("Ocorreu um erro: " + response.StatusCode);
        }

        // POST: Poi/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            try
            {
                var client = WebApiHttpClient.GetClient();
                var response = await client.DeleteAsync("api/Poi/" + id);
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction("Index");
                }
                else
                {
                    return Content("Ocorreu um erro: " + response.StatusCode);
                }
            }
            catch
            {
                return Content("Ocorreu um erro.");
            }
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
