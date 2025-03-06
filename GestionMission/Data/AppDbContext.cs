using GestionMission.Entities;
using Microsoft.EntityFrameworkCore;

namespace GestionMission.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Employer> employers { get; set; }
        public DbSet<Fonction> fonctions { get; set; }
        public DbSet<Affectation> affectations { get; set; }
        public DbSet<Conge> conges { get; set; }
        public DbSet<Mission> missions { get; set; }
        public DbSet<Statut>   statuts { get; set; }
        public DbSet<Team> teams { get; set; }
        public DbSet<Paiment> paiments { get; set; }
        public DbSet<Vehicule> vehicules { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Team>()
                .HasOne(t => t.Mission)
                .WithMany() // Pas de navigation inverse pour éviter la boucle
                .HasForeignKey(t => t.MissionId)
                .OnDelete(DeleteBehavior.Restrict); // Désactiver la suppression en cascade

            modelBuilder.Entity<Team>()
                .HasOne(t => t.Employer)
                .WithMany()
                .HasForeignKey(t => t.EmployerId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
