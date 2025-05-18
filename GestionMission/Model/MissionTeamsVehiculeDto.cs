namespace GestionMission.Model
{
    public class MissionTeamsVehiculeDto
    {
        public List<int>? EmployeIds { get; set; }
        public int? VehiculeId { get; set; }
        public int? EmployeId { get; set; }
        public int CreatedById { get; set; }
        public int UpdatedById { get; set; }
    }
}
