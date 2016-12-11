using ModelLibrary.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Lugares.DAL
{
    public class Datum : DbContext
    {

        public Datum() : base("Datum")
        {
            this.Database.Log = s => System.Diagnostics.Debug.WriteLine(s);
        }

        public DbSet<Local> Locais { get; set; }
        public DbSet<POI> PontosDeInteresse { get; set; }
        public DbSet<Meteorologia> RegistosMeteorologicos { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}