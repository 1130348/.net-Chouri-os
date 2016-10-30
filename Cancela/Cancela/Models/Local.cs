using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cancela.Models
{
    public class Local
    {
        public int ID { get; set; }

        public double GPS_Lat { get; set; }
        public double GPS_Long { get; set; }
        public string Nome { get; set; }

       
        public virtual ICollection<Poi> Pois { get; set; }

        public virtual ICollection<Meteorologia> Meteorologias { get; set; }
    }
}