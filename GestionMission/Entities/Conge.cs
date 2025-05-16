using System.ComponentModel.DataAnnotations;

namespace GestionMission.Entities
{
    public class Conge
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public required string Reason { get; set; }
        [Required]
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        public bool Actif { get; set; }
        public DateTime UpdateDate { get; set; }
        public DateTime CreateDate { get; set; }
        public int CreatedById { get; set; }
        public int UpdatedById { get; set; }
        public User? CreatedBy { get; set; }
        public User? UpdatedBy { get; set; }

    }
}
