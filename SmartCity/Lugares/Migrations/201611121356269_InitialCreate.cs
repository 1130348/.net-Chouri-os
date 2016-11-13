namespace Lugares.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Local",
                c => new
                {
                    LocalID = c.Int(nullable: false, identity: true),
                    GPS_Lat = c.Single(nullable: false),
                    GPS_Long = c.Single(nullable: false),
                    NomeLocal = c.String(),
                })
                .PrimaryKey(t => t.LocalID);

            CreateTable(
                "dbo.POI",
                c => new
                {
                    ID = c.Int(nullable: false, identity: true),
                    LocalID = c.Int(nullable: false),
                    NomePonto = c.String(),
                    DescricaoPonto = c.String(),
                })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Local", t => t.LocalID, cascadeDelete: true)
                .Index(t => t.LocalID);

           

        }

        public override void Down()
        {
            DropForeignKey("dbo.Meteorologia", "LocalID", "dbo.Local");
            DropForeignKey("dbo.POI", "LocalID", "dbo.Local");
            DropIndex("dbo.POI", new[] { "LocalID" });
            DropTable("dbo.POI");
            DropTable("dbo.Local");
        }
    }
}
