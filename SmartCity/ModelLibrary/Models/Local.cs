using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace ModelLibrary.Models
{
    public class Local
    {
        public int LocalID { get; set; }
        [DisplayName("GPS Latitude")]
        public float GPS_Lat { get; set; }
        [DisplayName("GPS Longitude")]
        public float GPS_Long { get; set; }
        [DisplayName("Local")]
        [Required]
        public string NomeLocal { get; set; }

        public virtual ICollection<POI> PontosDeInteresse { get; set; }
        public virtual ICollection<Meteorologia> RegistosMeteorologicos { get; set; }
    }
}
