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
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        public int EmployeeId { get; set; }
        public required Employee Employee { get; set; }
        [Required]
        public bool Actif { get; set; }
        [Required]
        public DateTime UpdateDate { get; set; }
        [Required]
        public DateTime CreateDate { get; set; }
        public int CreatedById { get; set; }
        public required User CreatedBy { get; set; }
        public int UpdatedById { get; set; }
        public required User UpdatedBy { get; set; }
    }
}
