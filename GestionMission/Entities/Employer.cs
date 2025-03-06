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

        // Clé étrangère optionnelle vers Fonction
        public int? FonctionId { get; set; }
        public Fonction? Fonction { get; set; }

        // Clé étrangère optionnelle vers Affectation
        public int? AffectationId { get; set; }
        public Affectation? Affectation { get; set; }

        public bool Actif { get; set; }
    }
}
