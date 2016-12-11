using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.Serialization;

namespace ModelLibrary.Models
{
    public class POI
    {
        public int ID { get; set; }
        public int LocalID { get; set; }
        [DisplayName("Nome")]

        public string creator { get; set; }
        [DisplayName("criador")]
        public string NomePonto { get; set; }
        [DisplayName("Descrição")]
        public string DescricaoPonto { get; set; }

        public virtual Local Local { get; set; }
    }
}
