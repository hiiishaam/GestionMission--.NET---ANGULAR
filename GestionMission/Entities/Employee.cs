using System.ComponentModel.DataAnnotations;
namespace GestionMission.Entities
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public required string FirstName { get; set; }
        [Required]
        [StringLength(50)]
        public required string LastName { get; set; }
        public int? FonctionId { get; set; }
        public Fonction? Fonction { get; set; }
        public int? AffectationId { get; set; }
        public Affectation? Affectation { get; set; }
        [Required]
        public bool Actif { get; set; }
        public DateTime? UpdateDate { get; set; }

        public DateTime? CreateDate { get; set; }
        public int? CreatedById { get; set; }
        public User? CreatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public User? UpdatedBy { get; set; }
    }
}
