using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cancela.Models
{
    public class MeteorologiaDTO
    {

        public int MeteorologiaID { get; set; }
        public DateTime DataDeLeitura { get; set; }
        public TimeSpan HoraDeLeitura { get; set; }
        public float Temperatura { get; set; }
        public float Vento { get; set; }
        public float Humidade { get; set; }
        public float Pressao { get; set; }
        public float NO { get; set; }
        public float NO2 { get; set; }
        public float CO2 { get; set; }
        public string NomeLocal { get; set; }
    }
}