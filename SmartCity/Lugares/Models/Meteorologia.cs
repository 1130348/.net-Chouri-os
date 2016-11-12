using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace ModelLibrary.Models
{
    public class Meteorologia
    {

        public int MeteorologiaID { get; set; }
        public int LocalID { get; set; }
        [DisplayName("Data de Leitura")]
        public DateTime DataDeLeitura { get; set; }
        [DisplayName("Hora de Leitura")]
        public TimeSpan HoraDeLeitura { get; set; }
        [DisplayName("Temperatura")]
        public float Temperatura { get; set; }
        [DisplayName("Vento")]
        public float Vento { get; set; }
        [DisplayName("Humidade")]
        public float Humidade { get; set; }
        [DisplayName("Pressão")]
        public float Pressao { get; set; }
        [DisplayName("NO")]
        public float NO { get; set; }
        [DisplayName("NO2")]
        public float NO2 { get; set; }
        [DisplayName("CO2")]
        public float CO2 { get; set; }

        public virtual Local Local { get; set; }
    }
}
