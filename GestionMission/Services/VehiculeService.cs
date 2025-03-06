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
            return _db.vehicules.Where(e => e.Nom.Contains(nom)).ToList();
        }

        public Vehicule Update(Vehicule vehicule, int id)
        {
            var existingVehicule = _db.vehicules.Find(id);
            if (existingVehicule != null)
            {
                existingVehicule.Nom = vehicule.Nom;
                existingVehicule.Matricule = vehicule.Matricule;
                existingVehicule.Chevaux = vehicule.Chevaux;
                existingVehicule.Actif = vehicule.Actif;
                _db.SaveChanges();
            }
            return existingVehicule;
        }
    }
}
