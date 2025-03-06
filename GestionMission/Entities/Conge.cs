using System.ComponentModel.DataAnnotations;

namespace GestionMission.Entities
{
    public class Conge
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Raison { get; set; }
        [Required]
        public DateTime DateDebut { get; set; }
        [Required]
        public DateTime DateFin { get; set; }
        public int EmployerId { get; set; }
        public Employer Employer { get; set; }

    }
}
