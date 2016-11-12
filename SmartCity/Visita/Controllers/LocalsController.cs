using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net;
using System.Web.Mvc;
using ModelLibrary.Models;
using System.Net.Http;
using Newtonsoft.Json;
using Visita.Helpers;
using Visita.Models;

namespace Visita.Controllers
{
    public class LocalsController : Controller
    {
        private VisitaContext db = new VisitaContext();

        // GET: Locals
        public async Task<ActionResult> Index()
        {
            var client = WebApiHttpClient.GetClient();
            HttpResponseMessage response = await client.GetAsync("api/Locals");
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                var locais = JsonConvert.DeserializeObject<IEnumerable<Local>>(content);
                return View(locais);
            }
            else
            {
                return Content("Ocorreu um erro: " + response.StatusCode);
            }
        }

        // GET: Locals/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var client = WebApiHttpClient.GetClient();
            HttpResponseMessage response = await client.GetAsync("api/Locals/" + id);
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                var local = JsonConvert.DeserializeObject<Local>(content);
                if (local == null) return HttpNotFound(); return View(local);
            }
            else
            {
                return Content("Ocorreu um erro: " + response.StatusCode);
            }
        }

        // GET: Locals/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Locals/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "LocalID,GPS_Lat,GPS_Long,NomeLocal")] Local local)
        {
            try
            {
                var client = WebApiHttpClient.GetClient();
                string localJSON = JsonConvert.SerializeObject(local);
                HttpContent content = new StringContent(localJSON,
                    System.Text.Encoding.Unicode, "application/json");
                var response = await client.PostAsync("api/Locals", content);

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

        // GET: Locals/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var client = WebApiHttpClient.GetClient();
            HttpResponseMessage response = await client.GetAsync("api/Locals/" + id);
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                var local = JsonConvert.DeserializeObject<Local>(content);
                if (local == null) return HttpNotFound();
                return View(local);
            }
            return Content("Ocorreu um erro: " + response.StatusCode);
        }

        // POST: Locals/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "LocalID,GPS_Lat,GPS_Long,NomeLocal")] Local local)
        {
            try
            {
                var client = WebApiHttpClient.GetClient();
                string localJSON = JsonConvert.SerializeObject(local);
                HttpContent content = new StringContent(localJSON, System.Text.Encoding.Unicode, "application/json");
                var response = await client.PutAsync("api/Locals/" + local.LocalID, content);
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

        // GET: Locals/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var client = WebApiHttpClient.GetClient();
            HttpResponseMessage response = await client.GetAsync("api/Locals/" + id);
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                var local = JsonConvert.DeserializeObject<Local>(content);
                if (local == null) return HttpNotFound();
                return View(local);
            }
            return Content("Ocorreu um erro: " + response.StatusCode);
        }

        // POST: Locals/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            try
            {
                var client = WebApiHttpClient.GetClient();
                var response = await client.DeleteAsync("api/Locals/" + id);
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
