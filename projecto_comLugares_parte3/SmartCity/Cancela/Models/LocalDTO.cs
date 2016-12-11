using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cancela.Models
{
    public class LocalDTO
    {
        public int LocalID { get; set; }
        public float GPS_Latitude { get; set; }
        public float GPS_Longitude { get; set; }
        public string NomeLocal { get; set; }
    }
}