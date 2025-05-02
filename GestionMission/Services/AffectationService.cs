using GestionMission.Data;
using GestionMission.Entities;
using GestionMission.Interfaces;
using Microsoft.EntityFrameworkCore;

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
            try
            {
                affectation.CreateDate = DateTime.UtcNow;
                affectation.UpdateDate = DateTime.UtcNow;
                _db.affectations.Add(affectation);
                _db.SaveChanges();
                return affectation;
            }
            catch (DbUpdateException ex)
            {
                // Cette exception arrive si problème avec la base (conflit, contrainte, etc.)
                throw new Exception("Erreur lors de l'ajout de l'affectation à la base de données.", ex);
            }
            catch (Exception ex)
            {
                // Autres exceptions générales
                throw new Exception("Une erreur inattendue est survenue lors de l'ajout de l'affectation.", ex);
            }
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

        public List<Affectation> FindByNom(string name)
        {
            return _db.affectations.Where(e => e.Name.Contains(name)).ToList();
        }

        public Affectation Update(Affectation affectation, int id)
        {
            var existingaffectation = _db.affectations.Find(id);
            if (existingaffectation != null)
            {
                existingaffectation.Name = affectation.Name;
                existingaffectation.Actif = affectation.Actif;
                existingaffectation.UpdatedById = affectation.UpdatedById;
                existingaffectation.UpdateDate = DateTime.UtcNow;
                _db.SaveChanges();
            }
            return existingaffectation;
        }
    }
}
