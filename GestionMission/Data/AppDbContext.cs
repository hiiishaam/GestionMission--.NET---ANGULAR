using GestionMission.Entities;
using Microsoft.EntityFrameworkCore;

namespace GestionMission.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Employee> employees { get; set; }
        public DbSet<Fonction> fonctions { get; set; }
        public DbSet<Affectation> affectations { get; set; }
        public DbSet<Conge> conges { get; set; }
        public DbSet<Mission> missions { get; set; }
        public DbSet<Statut> statuts { get; set; }
        public DbSet<Team> teams { get; set; }
        public DbSet<Payment> payments { get; set; }
        public DbSet<Vehicule> vehicules { get; set; }
        public DbSet<User> users { get; set; }

        /// <summary>
        /// OnModelCreating
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Team>()
                .HasOne(t => t.Mission)
                .WithMany() // Pas de navigation inverse pour éviter la boucle
                .HasForeignKey(t => t.MissionId)
                .OnDelete(DeleteBehavior.Restrict); // Désactiver la suppression en cascade

            modelBuilder.Entity<Team>()
                .HasOne(t => t.Employee)
                .WithMany()
                .HasForeignKey(t => t.EmployeeId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Affectation>()
                .HasOne(a => a.CreatedBy)  // Définir la relation
                .WithMany()  // Définir la relation inverse (si applicable)
                .HasForeignKey(a => a.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);  // Empêcher la suppression en cascade

            modelBuilder.Entity<Fonction>()
                .HasOne(a => a.CreatedBy)  // Définir la relation
                .WithMany()  // Définir la relation inverse (si applicable)
                .HasForeignKey(a => a.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);  // Empêcher la suppression en cascade

            modelBuilder.Entity<Mission>()
                .HasOne(a => a.CreatedBy)  // Définir la relation
                .WithMany()  // Définir la relation inverse (si applicable)
                .HasForeignKey(a => a.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);  // Empêcher la suppression en cascade

            modelBuilder.Entity<Payment>()
                .HasOne(a => a.CreatedBy)  // Définir la relation
                .WithMany()  // Définir la relation inverse (si applicable)
                .HasForeignKey(a => a.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);  // Empêcher la suppression en cascade

            modelBuilder.Entity<Conge>()
                .HasOne(a => a.CreatedBy)  // Définir la relation
                .WithMany()  // Définir la relation inverse (si applicable)
                .HasForeignKey(a => a.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);  // Empêcher la suppression en cascade

            modelBuilder.Entity<Employee>()
                .HasOne(a => a.CreatedBy)  // Définir la relation
                .WithMany()  // Définir la relation inverse (si applicable)
                .HasForeignKey(a => a.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);  // Empêcher la suppression en cascade

            modelBuilder.Entity<Vehicule>()
                .HasOne(a => a.CreatedBy)  // Définir la relation
                .WithMany()  // Définir la relation inverse (si applicable)
                .HasForeignKey(a => a.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);  // Empêcher la suppression en cascade

            modelBuilder.Entity<Team>()
                .HasOne(a => a.CreatedBy)  // Définir la relation
                .WithMany()  // Définir la relation inverse (si applicable)
                .HasForeignKey(a => a.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);  // Empêcher la suppression en cascade

            modelBuilder.Entity<Affectation>()
                .HasOne(a => a.UpdatedBy)  // Définir la relation
                .WithMany()  // Définir la relation inverse (si applicable)
                .HasForeignKey(a => a.UpdatedById)
                .OnDelete(DeleteBehavior.Restrict);  // Empêcher la suppression en cascade
            modelBuilder.Entity<Fonction>()
                .HasOne(a => a.UpdatedBy)  // Définir la relation
                .WithMany()  // Définir la relation inverse (si applicable)
                .HasForeignKey(a => a.UpdatedById)
                .OnDelete(DeleteBehavior.Restrict);  // Empêcher la suppression en cascade
            modelBuilder.Entity<Mission>()
                .HasOne(a => a.UpdatedBy)  // Définir la relation
                .WithMany()  // Définir la relation inverse (si applicable)
                .HasForeignKey(a => a.UpdatedById)
                .OnDelete(DeleteBehavior.Restrict);  // Empêcher la suppression en cascade
            modelBuilder.Entity<Payment>()
                .HasOne(a => a.UpdatedBy)  // Définir la relation
                .WithMany()  // Définir la relation inverse (si applicable)
                .HasForeignKey(a => a.UpdatedById)
                .OnDelete(DeleteBehavior.Restrict);  // Empêcher la suppression en cascade

            modelBuilder.Entity<Conge>()
                .HasOne(a => a.UpdatedBy)  // Définir la relation
                .WithMany()  // Définir la relation inverse (si applicable)
                .HasForeignKey(a => a.UpdatedById)
                .OnDelete(DeleteBehavior.Restrict);  // Empêcher la suppression en cascade
            modelBuilder.Entity<Employee>()
                .HasOne(a => a.UpdatedBy)  // Définir la relation
                .WithMany()  // Définir la relation inverse (si applicable)
                .HasForeignKey(a => a.UpdatedById)
                .OnDelete(DeleteBehavior.Restrict);  // Empêcher la suppression en cascade

            modelBuilder.Entity<Vehicule>()
               .HasOne(a => a.UpdatedBy)  // Définir la relation
               .WithMany()  // Définir la relation inverse (si applicable)
               .HasForeignKey(a => a.UpdatedById)
               .OnDelete(DeleteBehavior.Restrict);  // Empêcher la suppression en cascade
            modelBuilder.Entity<Team>()
               .HasOne(a => a.UpdatedBy)  // Définir la relation
               .WithMany()  // Définir la relation inverse (si applicable)
               .HasForeignKey(a => a.UpdatedById)
               .OnDelete(DeleteBehavior.Restrict);  // Empêcher la suppression en cascade

            modelBuilder.Entity<OrdreMissionDetails>().HasNoKey();
            modelBuilder.Entity<OrdreMissionDetails>().ToView(null);

            modelBuilder.Entity<VehiculeDisponible>().HasNoKey();
            modelBuilder.Entity<VehiculeDisponible>().ToView(null);


            modelBuilder.Entity<EmployeeDisponible>().HasNoKey();
            modelBuilder.Entity<EmployeeDisponible>().ToView(null);
        }
    }
}
