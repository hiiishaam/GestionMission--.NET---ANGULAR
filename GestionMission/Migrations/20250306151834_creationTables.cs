using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestionMission.Migrations
{
    /// <inheritdoc />
    public partial class creationTables : Migration
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
                name: "statuts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Actif = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_statuts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "vehicules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Matricule = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Actif = table.Column<bool>(type: "bit", nullable: false),
                    Chevaux = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vehicules", x => x.Id);
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
                    AffectationId = table.Column<int>(type: "int", nullable: true),
                    Actif = table.Column<bool>(type: "bit", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "conges",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Raison = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DateDebut = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateFin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EmployerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_conges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_conges_employers_EmployerId",
                        column: x => x.EmployerId,
                        principalTable: "employers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "missions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Raison = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    VilleDepart = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    VilleArrive = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Distance = table.Column<double>(type: "float", nullable: true),
                    DateDebut = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateFin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EmployerId = table.Column<int>(type: "int", nullable: false),
                    VehiculeId = table.Column<int>(type: "int", nullable: true),
                    StatutId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_missions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_missions_employers_EmployerId",
                        column: x => x.EmployerId,
                        principalTable: "employers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_missions_statuts_StatutId",
                        column: x => x.StatutId,
                        principalTable: "statuts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_missions_vehicules_VehiculeId",
                        column: x => x.VehiculeId,
                        principalTable: "vehicules",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "paiments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MissionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_paiments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_paiments_missions_MissionId",
                        column: x => x.MissionId,
                        principalTable: "missions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "teams",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MissionId = table.Column<int>(type: "int", maxLength: 50, nullable: false),
                    EmployerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_teams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_teams_employers_EmployerId",
                        column: x => x.EmployerId,
                        principalTable: "employers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_teams_missions_MissionId",
                        column: x => x.MissionId,
                        principalTable: "missions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_conges_EmployerId",
                table: "conges",
                column: "EmployerId");

            migrationBuilder.CreateIndex(
                name: "IX_employers_AffectationId",
                table: "employers",
                column: "AffectationId");

            migrationBuilder.CreateIndex(
                name: "IX_employers_FonctionId",
                table: "employers",
                column: "FonctionId");

            migrationBuilder.CreateIndex(
                name: "IX_missions_EmployerId",
                table: "missions",
                column: "EmployerId");

            migrationBuilder.CreateIndex(
                name: "IX_missions_StatutId",
                table: "missions",
                column: "StatutId");

            migrationBuilder.CreateIndex(
                name: "IX_missions_VehiculeId",
                table: "missions",
                column: "VehiculeId");

            migrationBuilder.CreateIndex(
                name: "IX_paiments_MissionId",
                table: "paiments",
                column: "MissionId");

            migrationBuilder.CreateIndex(
                name: "IX_teams_EmployerId",
                table: "teams",
                column: "EmployerId");

            migrationBuilder.CreateIndex(
                name: "IX_teams_MissionId",
                table: "teams",
                column: "MissionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "conges");

            migrationBuilder.DropTable(
                name: "paiments");

            migrationBuilder.DropTable(
                name: "teams");

            migrationBuilder.DropTable(
                name: "missions");

            migrationBuilder.DropTable(
                name: "employers");

            migrationBuilder.DropTable(
                name: "statuts");

            migrationBuilder.DropTable(
                name: "vehicules");

            migrationBuilder.DropTable(
                name: "affectations");

            migrationBuilder.DropTable(
                name: "fonctions");
        }
    }
}
