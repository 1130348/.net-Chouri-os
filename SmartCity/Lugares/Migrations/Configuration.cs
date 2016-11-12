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

            var registosMeteorologicos = new List<Meteorologia>
            {
                new Meteorologia {LocalID = 1, DataDeLeitura = DateTime.Parse("2016-11-12"), HoraDeLeitura = TimeSpan.Parse("13:00:00"), Temperatura = 10.00f, Vento = 31.00f,
                Humidade = 4.20f, Pressao = 1.61f, NO = 0.11f, NO2 = 0.32f, CO2 = 0.21f },
                new Meteorologia {LocalID = 1, DataDeLeitura = DateTime.Parse("2016-11-13"), HoraDeLeitura = TimeSpan.Parse("09:00:00"), Temperatura = 14.00f, Vento = 20.60f,
                Humidade = 3.40f, Pressao = 1.22f, NO = 0.21f, NO2 = 0.22f, CO2 = 0.01f },
                new Meteorologia {LocalID = 1, DataDeLeitura = DateTime.Parse("2016-11-14"), HoraDeLeitura = TimeSpan.Parse("15:30:00"), Temperatura = 8.00f, Vento = 19.32f,
                Humidade = 3.80f, Pressao = 0.55f, NO = 0.12f, NO2 = 0.12f, CO2 = 0.11f },
                new Meteorologia {LocalID = 1, DataDeLeitura = DateTime.Parse("2016-11-15"), HoraDeLeitura = TimeSpan.Parse("13:00:00"), Temperatura = 19.00f, Vento = 6.50f,
                Humidade = 5.60f, Pressao = 1.41f, NO = 0.12f, NO2 = 0.34f, CO2 = 0.06f },
                new Meteorologia {LocalID = 1, DataDeLeitura = DateTime.Parse("2016-11-16"), HoraDeLeitura = TimeSpan.Parse("09:00:00"), Temperatura = 16.00f, Vento = 35.90f,
                Humidade = 6.50f, Pressao = 0.91f, NO = 0.03f, NO2 = 0.12f, CO2 = 0.52f },
                new Meteorologia {LocalID = 18, DataDeLeitura = DateTime.Parse("2016-11-17"), HoraDeLeitura = TimeSpan.Parse("09:00:00"), Temperatura = 19.00f, Vento = 5.60f,
                Humidade = 4.80f, Pressao = 1.34f, NO = 0.09f, NO2 = 0.03f, CO2 = 0.21f}
            };

            registosMeteorologicos.ForEach(m => context.RegistosMeteorologicos.Add(m));
            context.SaveChanges();
        }
    }
}
