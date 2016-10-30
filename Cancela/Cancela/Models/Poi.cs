using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cancela.Models
{
    public class Poi
    {

        public int ID { get; set; }

        public string Nome { get; set; }
        public string Descricao { get; set; }

        public virtual Local Local { get; set; }
    }
}