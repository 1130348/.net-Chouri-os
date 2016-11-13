namespace Lugares.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using ModelLibrary.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<Lugares.DAL.Datum>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Lugares.DAL.Datum context)
        {
            var locais = new List<Local>
            {
                new Local {GPS_Lat = 41.158867f, GPS_Long = -8.630735f, NomeLocal = "Av. da Boavista" },
                new Local {GPS_Lat = 41.146704f, GPS_Long = -8.625865f, NomeLocal = "R. de Dom Manuel II" },
                new Local {GPS_Lat = 41.146889f, GPS_Long = -8.614755f, NomeLocal = "R. das Carmelitas" },
                new Local {GPS_Lat = 41.142848f, GPS_Long = -8.611213f, NomeLocal = "Terreiro da Sé" },
                new Local {GPS_Lat = 41.161306f, GPS_Long = -8.581725f, NomeLocal = "Via Futebol Clube do Porto" },
                new Local {GPS_Lat = 41.139966f, GPS_Long = -8.609422f, NomeLocal = "Ponte Luís I" }
            };

            locais.ForEach(l => context.Locais.Add(l));
            context.SaveChanges();

            var pontosDeInteresse = new List<POI>
            {
                new POI {LocalID = 1, NomePonto = "Casa da Música", DescricaoPonto = "Sala de Concertos" },
                new POI {LocalID = 2, NomePonto = "Pavilhão Rosa Mota", DescricaoPonto = "Pavilhao" },
                new POI {LocalID = 3, NomePonto = "Livraria Lello & Irmão", DescricaoPonto = "Livraria" },
                new POI {LocalID = 4, NomePonto = "Sé do Porto", DescricaoPonto = "Sé" },
                new POI {LocalID = 5, NomePonto = "Estádio do Dragão", DescricaoPonto = "Estadio" },
                new POI {LocalID = 6, NomePonto = "Ponte Luís I", DescricaoPonto = "Ponte" }
            };

            pontosDeInteresse.ForEach(p => context.PontosDeInteresse.Add(p));
            context.SaveChanges();

          
        }
    }
}
