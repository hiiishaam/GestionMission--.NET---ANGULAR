using System.ComponentModel.DataAnnotations;

namespace GestionMission.Entities
{
    public class Statut
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Nom { get; set; }
        public bool Actif { get; set; }
    }
}
