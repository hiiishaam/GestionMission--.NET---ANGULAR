namespace GestionMission.Entities
{
    /// <summary>
    /// VehiculeDisponible
    /// </summary>
    public class VehiculeDisponible
    {
        public int VehiculeId { get; set; }
        public string? VehiculeName { get; set; }
        public string? LicensePlate { get; set; }
        public int Horsepower { get; set; }
        public int? EstAffecteAMission { get; set; }
    }
}
