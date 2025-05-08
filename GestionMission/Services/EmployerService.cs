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
        public Employee Add(Employee employer)
        {
            if (employer == null)
                throw new ArgumentNullException(nameof(employer));

            //Ajouter un employé avec les relations facultatives
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
            employer.CreateDate = DateTime.UtcNow;
            employer.UpdateDate = DateTime.UtcNow;
            _db.employees.Add(employer);
            _db.SaveChanges();
            return employer;
        }

        // Supprimer un employé
        public Employee Delete(int id)
        {
            var employer = _db.employees.Find(id);
            if (employer == null)
                return null; // Employer non trouvé, retourne null

            // Retirer les relations avant de supprimer (optionnel)
            employer.Fonction = null;
            employer.Affectation = null;

            _db.employees.Remove(employer);
            _db.SaveChanges();
            return employer;
        }

        // Trouver tous les employés
        public List<Employee> FindAll()
        {
            return _db.employees.Include(e => e.Fonction).Include(e => e.Affectation).ToList();
        }

        public List<Employee> FindByIds(List<int> ids)
        {
         
            return _db.employees.Where(e => ids.Contains(e.Id)).Include(e => e.Fonction).Include(e => e.Affectation).ToList();
        }

        // Trouver un employé par ID
        public Employee FindById(int id)
        {
            return _db.employees.Include(e => e.Fonction).Include(e => e.Affectation).FirstOrDefault(e => e.Id == id);
        }

        // Trouver un employé par son nom
        public List<Employee> FindByNom(string nom)
        {
            if (string.IsNullOrEmpty(nom))
                return new List<Employee>(); // Evite les recherches inutiles

            return _db.employees.Include(e => e.Fonction).Include(e => e.Affectation)
                                .Where(e => e.FirstName.Contains(nom)).ToList();
        }

        // Mettre à jour un employé
        public Employee Update(Employee employer, int id)
        {
            var existingEmployer = _db.employees.Find(id);
            if (existingEmployer == null)
                return null; // Employer non trouvé

            existingEmployer.FirstName = employer.FirstName;
            existingEmployer.LastName = employer.LastName;
            existingEmployer.Actif = employer.Actif;
            existingEmployer.UpdatedById = employer.UpdatedById;
            existingEmployer.UpdateDate = DateTime.UtcNow;

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