using System.ComponentModel.DataAnnotations;
namespace GestionMission.Entities
{
    public class Fonction
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(500)]
        public required string Name { get; set; }
        [Required]
        public bool Actif { get; set; }
        public DateTime? UpdateDate { get; set; }

        public DateTime? CreateDate { get; set; }
        public int? CreatedById { get; set; }
        public User? CreatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public User? UpdatedBy { get; set; }
    }
}
