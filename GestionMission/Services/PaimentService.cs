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

        public Payment Add(Payment paiment)
        {
            try
            {
                if (paiment == null)
                {
                    throw new ArgumentNullException(nameof(paiment), "Paiment cannot be null.");
                }

                _db.payments.Add(paiment);
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

        public Payment Delete(int id)
        {
            try
            {
                var paiment = _db.payments.Find(id);
                if (paiment == null)
                {
                    throw new Exception("Paiment not found.");
                }

                _db.payments.Remove(paiment);
                _db.SaveChanges();
                return paiment;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the Paiment: " + ex.Message);
            }
        }

        public List<Payment> FindAll()
        {
            try
            {
                return _db.payments.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while retrieving the list of Paiments: " + ex.Message);
            }
        }

        public Payment FindById(int id)
        {
            try
            {
                var paiment = _db.payments.Find(id);
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

        public Payment Update(Payment paiment, int id)
        {
            try
            {
                var existingPaiment = _db.payments.Find(id);
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
