namespace GestionMission.Model
{
    public class CongeDto
    {
        public string Reason { get; set; }
        public string DateDebutString { get; set; }
        public string DateFinString { get; set; }
        public int EmployeeId { get; set; }
        public int CreatedById { get; set; }
        public int UpdatedById { get; set; }
        public bool Actif { get; set; }
    }

}
