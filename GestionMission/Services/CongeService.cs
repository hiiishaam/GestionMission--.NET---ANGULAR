using GestionMission.Data;
using GestionMission.Entities;
using GestionMission.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace GestionMission.Services
{
    public class CongeService : ICongeService
    {
        private readonly AppDbContext _db;

        public CongeService(AppDbContext db)
        {
            _db = db;
        }

        public Conge Add(Conge conge)
        {
            if (conge == null)
                throw new ArgumentNullException(nameof(conge));

            // Vérifier si l'employé associé existe
            var employer = _db.employees.Find(conge.EmployeeId);
            if (employer == null)
            {
                throw new InvalidOperationException($"L'employé avec l'ID {conge.EmployeeId} n'existe pas.");
            }

            // Associer l'employé au congé
            conge.Employee = employer;

            // Ajouter le congé dans la base de données
            conge.CreateDate = DateTime.UtcNow;
            conge.UpdateDate = DateTime.UtcNow;
            _db.conges.Add(conge);
            _db.SaveChanges();
            return conge;
        }



        public Conge Delete(int id)
        {
            var conge = _db.conges.Find(id);
            if (conge != null)
            {
                _db.conges.Remove(conge);
                _db.SaveChanges();
            }
            return conge;
        }

        //public List<Conge> FindAll()
        //{
        //    return _db.conges.ToList();
        //}

        /// <summary>
        /// IsEmployeeDisponible
        /// </summary>
        /// <param name="employeeId"></param>
        /// <param name="congeId"></param>
        /// <param name="dateDebut"></param>
        /// <param name="dateFin"></param>
        /// <returns></returns>
        public bool IsEmployeeDisponible(int employeeId,int? congeId, DateTime dateDebut, DateTime dateFin)
        {
            var isBusy = _db.Database
                .SqlQueryRaw<int>(
                    "EXEC CheckEmployeeDisponibilite @EmployeeId = {0}, @DateDebut = {1}, @DateFin = {2}, @CongeId = {3}",
                    employeeId, dateDebut, dateFin, congeId.HasValue ? congeId.Value : (object)DBNull.Value)
                .AsEnumerable()
                .FirstOrDefault();

            return isBusy == 1; // true = occupé , false = disponible
        }


        public List<Conge> FindAll()
        {
            return _db.conges.Include(c => c.Employee).ToList();
        }


        public List<Conge> FindByDateDebut(string date)
        {
            throw new NotImplementedException();
        }

        public Conge FindById(int id)
        {
            return _db.conges.Find(id);
        }


        public Conge Update(Conge conge, int id)
        {
            var existingConge = _db.conges.Find(id);
            if (existingConge != null)
            {
                existingConge.Reason = conge.Reason;
                existingConge.StartDate = conge.StartDate;
                existingConge.EndDate = conge.EndDate;
                existingConge.Actif = conge.Actif;
                existingConge.UpdateDate = DateTime.UtcNow;
                existingConge.UpdatedById = conge.UpdatedById;
                _db.SaveChanges();
            }
            return existingConge;
        }
    }
}
