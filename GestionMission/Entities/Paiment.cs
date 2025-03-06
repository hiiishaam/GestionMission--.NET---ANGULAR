using System.ComponentModel.DataAnnotations;

namespace GestionMission.Entities
{
    public class Paiment
    {
        [Key]
        public int Id { get; set; }
        public int MissionId { get; set; }
        public Mission Mission { get; set; }

    }
}
