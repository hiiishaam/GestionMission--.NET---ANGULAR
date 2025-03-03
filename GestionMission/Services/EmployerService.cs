using GestionMission.Data;
using GestionMission.Entities;
using GestionMission.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GestionMission.Services
{
    public class EmployerService : IEmployerService
    {
        private readonly AppDbContext _db;

        public EmployerService(AppDbContext db)
        {
            _db = db;
        }

        // Ajouter un employé
        public Employer Add(Employer employer)
        {
            if (employer == null)
                throw new ArgumentNullException(nameof(employer));

            // Ajouter un employé avec les relations facultatives
            if (employer.FonctionId.HasValue)
            {
                var fonction = _db.fonctions.Find(employer.FonctionId);
                if (fonction != null)
                {
                    employer.Fonction = fonction;
                }
            }

            if (employer.AffectationId.HasValue)
            {
                var affectation = _db.affectations.Find(employer.AffectationId);
                if (affectation != null)
                {
                    employer.Affectation = affectation;
                }
            }

            _db.employers.Add(employer);
            _db.SaveChanges();
            return employer;
        }

        // Supprimer un employé
        public Employer Delete(int id)
        {
            var employer = _db.employers.Find(id);
            if (employer == null)
                return null; // Employer non trouvé, retourne null

            // Retirer les relations avant de supprimer (optionnel)
            employer.Fonction = null;
            employer.Affectation = null;

            _db.employers.Remove(employer);
            _db.SaveChanges();
            return employer;
        }

        // Trouver tous les employés
        public List<Employer> FindAll()
        {
            return _db.employers.Include(e => e.Fonction).Include(e => e.Affectation).ToList();
        }

        // Trouver un employé par ID
        public Employer FindById(int id)
        {
            return _db.employers.Include(e => e.Fonction).Include(e => e.Affectation).FirstOrDefault(e => e.Id == id);
        }

        // Trouver un employé par son nom
        public List<Employer> FindByNom(string nom)
        {
            if (string.IsNullOrEmpty(nom))
                return new List<Employer>(); // Evite les recherches inutiles

            return _db.employers.Include(e => e.Fonction).Include(e => e.Affectation)
                                .Where(e => e.Nom.Contains(nom)).ToList();
        }

        // Mettre à jour un employé
        public Employer Update(Employer employer, int id)
        {
            var existingEmployer = _db.employers.Find(id);
            if (existingEmployer == null)
                return null; // Employer non trouvé

            existingEmployer.Nom = employer.Nom;
            existingEmployer.Prenom = employer.Prenom;

            // Mettre à jour les relations, si elles existent
            if (employer.FonctionId.HasValue)
            {
                var fonction = _db.fonctions.Find(employer.FonctionId);
                if (fonction != null)
                {
                    existingEmployer.Fonction = fonction;
                }
            }

            if (employer.AffectationId.HasValue)
            {
                var affectation = _db.affectations.Find(employer.AffectationId);
                if (affectation != null)
                {
                    existingEmployer.Affectation = affectation;
                }
            }

            _db.SaveChanges();
            return existingEmployer;
        }
    }
}