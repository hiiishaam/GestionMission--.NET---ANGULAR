using System.ComponentModel.DataAnnotations;

namespace GestionMission.Entities
{
    public class Statut
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public required string Name { get; set; }
        [Required]
        [StringLength(255)]
        public required string Code { get; set; }
        [Required]
        [StringLength(255)]
        public required string Progress { get; set; }
        [Required]
        [StringLength(255)]
        public required string Commentaire { get; set; }
        [Required]
        public bool Actif { get; set; }
        [Required]
        public DateTime UpdateDate { get; set; }
        [Required]
        public DateTime CreateDate { get; set; }
    }
}
