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
    public class MeteorologiaController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Meteorologia
        public async Task<ActionResult> Index()
        {
            var client = WebApiHttpClient.GetClient();
            HttpResponseMessage response = await client.GetAsync("api/Meteorologia");
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                var meteorologia =
                JsonConvert.DeserializeObject<IEnumerable<Meteorologia>>(content);
                return View(meteorologia);
            }
            else
            {
                return Content("Ocorreu um erro: " + response.StatusCode);
            }
        }

        // GET: Meteorologia/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var client = WebApiHttpClient.GetClient();
            HttpResponseMessage response = await client.GetAsync("api/Meteorologia" + id);
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                var meteorologia = JsonConvert.DeserializeObject<Meteorologia>(content);
                if (meteorologia == null) return HttpNotFound();
                return View(meteorologia);
            }
            else
            {
                return Content("Ocorreu um erro: " + response.StatusCode);
            }
        }

        // GET: Meteorologia/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Meteorologia/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(
[Bind(Include = "Data_de_Leitura,Hora_de_Leitura,temp,vento,humidade,pressao,NO,NO2,CO2")] Meteorologia meteorologia)
        {
            try
            {
                var client = WebApiHttpClient.GetClient();
                string editoraJSON = JsonConvert.SerializeObject(meteorologia);
                HttpContent content = new StringContent(editoraJSON,
                System.Text.Encoding.Unicode, "application/json");
                var response = await client.PostAsync("api/Metereologia", content);
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

        // GET: Meteorologia/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var client = WebApiHttpClient.GetClient();
            HttpResponseMessage response = await client.GetAsync("api/Meteorologia/" + id);
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                var meteorologia = JsonConvert.DeserializeObject<Meteorologia>(content);
                if (meteorologia == null) return HttpNotFound();
                return View(meteorologia);
            }
            return Content("Ocorreu um erro: " + response.StatusCode);
        }

        // POST: Meteorologia/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(
[Bind(Include = "Data_de_Leitura,Hora_de_Leitura,temp,vento,humidade,pressao,NO,NO2,CO2")] Meteorologia meteorologia)
        {
            try
            {
                var client = WebApiHttpClient.GetClient();
                string editoraJSON = JsonConvert.SerializeObject(meteorologia);
                HttpContent content = new StringContent(editoraJSON,
                System.Text.Encoding.Unicode, "application/json");
                var response =
                await client.PutAsync("api/Meteorologia/" + meteorologia.ID, content);
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

        // GET: Meteorologia/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var client = WebApiHttpClient.GetClient();
            HttpResponseMessage response = await client.GetAsync("api/Meteorologia/" + id);
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                var meteorologia = JsonConvert.DeserializeObject<Meteorologia>(content);
                if (meteorologia == null) return HttpNotFound();
                return View(meteorologia);
            }
            return Content("Ocorreu um erro: " + response.StatusCode);
        }
        // POST: Meteorologia/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            try
            {
                var client = WebApiHttpClient.GetClient();
                var response = await client.DeleteAsync("api/Meteorologia/" + id);
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
