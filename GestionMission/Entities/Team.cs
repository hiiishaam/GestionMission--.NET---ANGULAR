using System.ComponentModel.DataAnnotations;

namespace GestionMission.Entities
{
    public class Team
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public int MissionId { get; set; }
        public Mission Mission { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
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
