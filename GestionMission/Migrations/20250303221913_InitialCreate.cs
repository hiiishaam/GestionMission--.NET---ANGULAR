using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestionMission.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "affectations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_affectations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "fonctions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_fonctions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "employers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Prenom = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FonctionId = table.Column<int>(type: "int", nullable: true),
                    AffectationId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_employers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_employers_affectations_AffectationId",
                        column: x => x.AffectationId,
                        principalTable: "affectations",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_employers_fonctions_FonctionId",
                        column: x => x.FonctionId,
                        principalTable: "fonctions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_employers_AffectationId",
                table: "employers",
                column: "AffectationId");

            migrationBuilder.CreateIndex(
                name: "IX_employers_FonctionId",
                table: "employers",
                column: "FonctionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "employers");

            migrationBuilder.DropTable(
                name: "affectations");

            migrationBuilder.DropTable(
                name: "fonctions");
        }
    }
}
