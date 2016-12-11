using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cancela.Models
{
    public class POIDTO
    {
        public int PoiID { get; set; }
        public string NomePonto { get; set; }
        public string DescricaoPonto { get; set; }

        public string creator { get; set; }
        public string NomeLocal { get; set; }
    }
}