using GestionMission.Data;
using GestionMission.Entities;
using GestionMission.Interfaces;


namespace GestionMission.Services
{
    public class VehiculeService : IVehiculeService
    {
        private readonly AppDbContext _db;

        public VehiculeService(AppDbContext db)
        {
            _db = db;
        }

        public Vehicule Add(Vehicule vehicule)
        {
            vehicule.CreateDate = DateTime.UtcNow;
            vehicule.UpdateDate = DateTime.UtcNow;
            _db.vehicules.Add(vehicule);
            _db.SaveChanges();
            return vehicule;
        }

        public Vehicule Delete(int id)
        {
            var vehicule = _db.vehicules.Find(id);
            if (vehicule != null)
            {
                _db.vehicules.Remove(vehicule);
                _db.SaveChanges();
            }
            return vehicule;
        }

        public List<Vehicule> FindAll()
        {
            return _db.vehicules.ToList();
        }

        public Vehicule FindById(int id)
        {
            return _db.vehicules.Find(id);
        }

        public List<Vehicule> FindByNom(string nom)
        {
            return _db.vehicules.Where(e => e.Name.Contains(nom)).ToList();
        }

        public Vehicule Update(Vehicule vehicule, int id)
        {
            var existingVehicule = _db.vehicules.Find(id);
            if (existingVehicule != null)
            {
                existingVehicule.Name = vehicule.Name;
                existingVehicule.LicensePlateNumber = vehicule.LicensePlateNumber;
                existingVehicule.Horsepower = vehicule.Horsepower;
                existingVehicule.Actif = vehicule.Actif;
                existingVehicule.UpdatedById = vehicule.UpdatedById;
                existingVehicule.UpdateDate = DateTime.UtcNow;
                _db.SaveChanges();
            }
            return existingVehicule;
        }
    }
}
