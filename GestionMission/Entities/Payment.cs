using System.ComponentModel.DataAnnotations;

namespace GestionMission.Entities
{
    public class Payment
    {
        [Key]
        public int Id { get; set; }
        public int MissionId { get; set; }
        public Mission Mission { get; set; }


        public int CreatedById { get; set; }
        public required User CreatedBy { get; set; }
        public int UpdatedById { get; set; }
        public required User UpdatedBy { get; set; }
    }
}
