using GestionMission.Data;
using GestionMission.Entities;
using GestionMission.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GestionMission.Services
{
    public class PaimentService : IPaimentService
    {
        private readonly AppDbContext _db;

        public PaimentService(AppDbContext db)
        {
            _db = db;
        }

        public Paiment Add(Paiment paiment)
        {
            try
            {
                if (paiment == null)
                {
                    throw new ArgumentNullException(nameof(paiment), "Paiment cannot be null.");
                }

                _db.paiments.Add(paiment);
                _db.SaveChanges();
                return paiment;
            }
            catch (ArgumentNullException ex)
            {
                // Handle null argument exception
                throw new Exception("Error: " + ex.Message);
            }
            catch (DbUpdateException ex)
            {
                // Handle database related issues
                throw new Exception("Database error while adding Paiment: " + ex.Message);
            }
            catch (Exception ex)
            {
                // Catch any other general exceptions
                throw new Exception("An unexpected error occurred while adding Paiment: " + ex.Message);
            }
        }

        public Paiment Delete(int id)
        {
            try
            {
                var paiment = _db.paiments.Find(id);
                if (paiment == null)
                {
                    throw new Exception("Paiment not found.");
                }

                _db.paiments.Remove(paiment);
                _db.SaveChanges();
                return paiment;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the Paiment: " + ex.Message);
            }
        }

        public List<Paiment> FindAll()
        {
            try
            {
                return _db.paiments.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while retrieving the list of Paiments: " + ex.Message);
            }
        }

        public Paiment FindById(int id)
        {
            try
            {
                var paiment = _db.paiments.Find(id);
                if (paiment == null)
                {
                    throw new Exception("Paiment not found.");
                }

                return paiment;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while retrieving the Paiment: " + ex.Message);
            }
        }

        public Paiment Update(Paiment paiment, int id)
        {
            try
            {
                var existingPaiment = _db.paiments.Find(id);
                if (existingPaiment == null)
                {
                    throw new Exception("Paiment not found.");
                }

                existingPaiment.MissionId = paiment.MissionId;
                _db.SaveChanges();
                return existingPaiment;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the Paiment: " + ex.Message);
            }
        }
    }
}
