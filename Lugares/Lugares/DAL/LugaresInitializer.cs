using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using Lugares.Models;

namespace Lugares.DAL
{
    public class LugaresInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<LugaresContext>
    {
        protected override void Seed(LugaresContext context)
        {
            var pois = new List<Poi>
            {
            new Poi{ID=1030,Nome="Carson",Descricao="Alexander"},
            new Poi{ID=1450,Nome="Meredith",Descricao="Alonso"},
 
            };

            pois.ForEach(s => context.Pois.Add(s));
            context.SaveChanges();
            var locais = new List<Local>
            {
            new Local{ID=1050,GPS_Lat=8.46212,GPS_Long=-16.2144,Nome="Porto"},
            new Local{ID=1051,GPS_Lat=7.445,GPS_Long=1.4145,Nome="Braga"},
      
            };
            locais.ForEach(s => context.Locais.Add(s));
            context.SaveChanges();
           /* var enrollments = new List<Enrollment>
            {
            new Enrollment{StudentID=1,CourseID=1050,Grade=Grade.A},
            new Enrollment{StudentID=1,CourseID=4022,Grade=Grade.C},
            new Enrollment{StudentID=1,CourseID=4041,Grade=Grade.B},
            new Enrollment{StudentID=2,CourseID=1045,Grade=Grade.B},
            new Enrollment{StudentID=2,CourseID=3141,Grade=Grade.F},
            new Enrollment{StudentID=2,CourseID=2021,Grade=Grade.F},
            new Enrollment{StudentID=3,CourseID=1050},
            new Enrollment{StudentID=4,CourseID=1050,},
            new Enrollment{StudentID=4,CourseID=4022,Grade=Grade.F},
            new Enrollment{StudentID=5,CourseID=4041,Grade=Grade.C},
            new Enrollment{StudentID=6,CourseID=1045},
            new Enrollment{StudentID=7,CourseID=3141,Grade=Grade.A},
            };
            enrollments.ForEach(s => context.Enrollments.Add(s));
            context.SaveChanges();*/
        }
    }
}