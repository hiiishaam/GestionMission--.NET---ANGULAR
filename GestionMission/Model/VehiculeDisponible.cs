namespace GestionMission.Model
{
    /// <summary>
    /// VehiculeDisponible
    /// </summary>
    public class VehiculeDisponible
    {
        public int VehiculeId { get; set; }
        public string VehiculeName { get; set; }
        public string LicensePlate { get; set; }
        public int Horsepower { get; set; }
        public bool EstAffecteAMission { get; set; }
    }
}
