using System.ComponentModel.DataAnnotations;
namespace GestionMission.Entities
{
    public class Affectation
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(500)]
        public string Nom { get; set; }
    }
}
