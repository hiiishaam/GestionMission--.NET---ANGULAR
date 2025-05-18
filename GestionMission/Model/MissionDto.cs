namespace GestionMission.Model
{
    public class MissionDto
    {
        public string Description { get; set; }
        public string DateDepartString { get; set; }
        public string DateRetourString { get; set; }
        public string villeArrive { get; set; }
        public int EmployeId { get; set; }
        public int? VehiculeId { get; set; }
        public int? StatutId { get; set; }
        public int CreatedById { get; set; }
        public int UpdatedById { get; set; }
    }
}
