using GestionMission.Data;
using GestionMission.Entities;
using GestionMission.Interfaces;

namespace GestionMission.Services
{
    public class AffectationService : IAffectationService
    {
        private AppDbContext _db;

        public AffectationService(AppDbContext db)
        {
            _db = db;
        }

        public Affectation Add(Affectation affectation)
        {
            _db.affectations.Add(affectation);
            _db.SaveChanges();
            return affectation;

        }

        public Affectation Delete(int id)
        {
            var affectation = _db.affectations.Find(id);
            if (affectation != null)
            {
                _db.affectations.Remove(affectation);
                _db.SaveChanges();
            }
            return affectation;
        }

        public List<Affectation> FindAll()
        {
            return _db.affectations.ToList();
        }

        public Affectation FindById(int id)
        {
            return _db.affectations.Find(id);
        }

        public List<Affectation> FindByNom(string nom)
        {
            return _db.affectations.Where(e => e.Nom.Contains(nom)).ToList();
        }

        public Affectation Update(Affectation affectation, int id)
        {
            var existingaffectation = _db.affectations.Find(id);
            if (existingaffectation != null)
            {
                existingaffectation.Nom = affectation.Nom;
                _db.SaveChanges();
            }
            return existingaffectation;
        }
    }
}
