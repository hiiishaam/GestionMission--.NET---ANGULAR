using System.ComponentModel.DataAnnotations;

namespace GestionMission.Entities
{
    public class Vehicule
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Nom { get; set; }
        [Required]
        [StringLength(50)]
        public string Matricule { get; set; }
        public bool Actif { get; set; }
        public int Chevaux { get; set; }
    }
}
