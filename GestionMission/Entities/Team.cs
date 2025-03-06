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
        public int EmployerId { get; set; }
        public Employer Employer { get; set; }
    }
}
