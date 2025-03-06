using GestionMission.Data;
using GestionMission.Entities;
using GestionMission.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

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
            var employer = _db.employers.Find(conge.EmployerId);
            if (employer == null)
            {
                throw new InvalidOperationException($"L'employé avec l'ID {conge.EmployerId} n'existe pas.");
            }

            // Associer l'employé au congé
            conge.Employer = employer;

            // Ajouter le congé dans la base de données
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

        public List<Conge> FindAll()
        {
            return _db.conges.ToList();
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
                existingConge.Raison = conge.Raison;
                existingConge.DateDebut = conge.DateDebut;
                existingConge.DateFin = conge.DateFin;
                existingConge.EmployerId = conge.EmployerId;

                _db.SaveChanges();
            }
            return existingConge;
        }
    }
}
