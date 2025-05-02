using System.ComponentModel.DataAnnotations;

namespace GestionMission.Entities
{
    public class Mission
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(500)]
        public string Raison { get; set; }
        [Required]
        [StringLength(100)]
        public string VilleDepart { get; set; }
        [StringLength(100)]
        public string VilleArrive { get; set; }
        public Double? Distance { get; set; }
        [Required]
        public DateTime? DateDebut { get; set; }
        [Required]
        public DateTime? DateFin { get; set; }
        public int EmployerId { get; set; }
        public Employee? Employer { get; set; }
        public int? VehiculeId { get; set; }
        public Vehicule? Vehicule { get; set; }
        public int? StatutId { get; set; }
        public Statut? Statut { get; set; }
        public int? CreatedById { get; set; }
        public User? CreatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public User? UpdatedBy { get; set; }

    }
}
