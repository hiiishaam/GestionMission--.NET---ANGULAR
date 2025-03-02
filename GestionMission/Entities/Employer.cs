using System.ComponentModel.DataAnnotations;
namespace GestionMission.Entities
{
    public class Employer
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Nom { get; set; }
        [Required]
        [StringLength(50)]
        public string Prenom { get; set; }
    }
}
