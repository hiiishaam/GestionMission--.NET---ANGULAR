using System.ComponentModel.DataAnnotations;

namespace GestionMission.Entities
{
    public class StatutMission
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public Enum Name { get; set; }


    } 
}
