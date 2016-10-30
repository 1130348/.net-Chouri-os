using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cancela.Models
{
    public class Meteorologia
    {
        public int ID { get; set; }
        public DateTime Data_de_leitura { get; set; }
        public string Hora_de_leitura { get; set; }
        public int temp { get; set; }
        public int vento { get; set; }
        public int humidade { get; set; }
        public int pressao { get; set; }
        public int NO { get; set; }
        public int NO2 { get; set; }
        public int CO2 { get; set; }

        public virtual Local Local { get; set; }

    }
}