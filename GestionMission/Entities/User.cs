using System.ComponentModel.DataAnnotations;
namespace GestionMission.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(500)]
        public required string FullName { get; set; }
        [Required]
        [StringLength(500)]
        public required string Password { get; set; }
        [Required]
        [StringLength(500)]
        public required string Email { get; set; }
        [Required]
        public bool Actif { get; set; }
        [Required]
        public DateTime UpdateDate { get; set; }
        [Required]
        public DateTime CreateDate { get; set; }
    }
}
