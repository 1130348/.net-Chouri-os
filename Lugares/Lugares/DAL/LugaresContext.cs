using Lugares.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Lugares.DAL
{
    public class LugaresContext : DbContext
    {

        public LugaresContext() : base("LugaresContext")
        {
        }

        public DbSet<Poi> Pois { get; set; }
        public DbSet<Local> Locais { get; set; }
        public DbSet<Meteorologia> Meteorologias { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}