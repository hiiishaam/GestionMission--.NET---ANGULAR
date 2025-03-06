using GestionMission.Data;
using GestionMission.Entities;
using GestionMission.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GestionMission.Services
{
    public class MissionService : IMissionService
    {
        private readonly AppDbContext _db;

        public MissionService(AppDbContext db)
        {
            _db = db;
        }

        public Mission Add(Mission mission)
        {
            if (mission == null)
                throw new ArgumentNullException(nameof(mission), "La mission ne peut pas être nulle.");

            try
            {
                // Vérifier et attacher l'Employer
                var employer = _db.employers.Find(mission.EmployerId);
                if (employer != null)
                {
                    mission.Employer = employer;
                }
                else
                {
                    throw new ArgumentException("L'employé spécifié n'existe pas.", nameof(mission.EmployerId));
                }

                // Vérifier et attacher le Véhicule (facultatif)
                if (mission.VehiculeId.HasValue)
                {
                    var vehicule = _db.vehicules.Find(mission.VehiculeId);
                    if (vehicule != null)
                    {
                        mission.Vehicule = vehicule;
                    }
                    else
                    {
                        throw new ArgumentException("Le véhicule spécifié n'existe pas.", nameof(mission.VehiculeId));
                    }
                }

                // Vérifier et attacher le Statut
                var statut = _db.statuts.Find(mission.StatutId);
                if (statut != null)
                {
                    mission.Statut = statut;
                }
                else
                {
                    throw new ArgumentException("Le statut spécifié n'existe pas.", nameof(mission.StatutId));
                }

                // Ajouter la mission à la base de données
                _db.missions.Add(mission);
                _db.SaveChanges();

                return mission;
            }
            catch (ArgumentException ex)
            {
                // Gérer les erreurs spécifiques liées à des paramètres incorrects
                // Vous pouvez loguer l'erreur ici si nécessaire
                throw new InvalidOperationException("Une erreur est survenue lors de l'ajout de la mission.", ex);
            }
            catch (Exception ex)
            {
                // Gérer les erreurs générales
                // Vous pouvez loguer l'erreur ici si nécessaire
                throw new InvalidOperationException("Une erreur inattendue est survenue lors de l'ajout de la mission.", ex);
            }
        }


        public Mission Delete(int id)
        {
            var mission = _db.missions.Find(id);
            if (mission == null)
                 return null;

            _db.missions.Remove(mission);
            _db.SaveChanges();
            return mission;
        }

        public List<Mission> FindAll()
        {
            return _db.missions.Include(m => m.Employer)
                               .Include(m => m.Vehicule)
                               .Include(m => m.Statut)
                               .ToList();
        }

        public Mission FindById(int id)
        {
            var mission = _db.missions.Include(m => m.Employer)
                                      .Include(m => m.Vehicule)
                                      .Include(m => m.Statut)
                                      .FirstOrDefault(m => m.Id == id);
            if (mission == null)
                throw new KeyNotFoundException("Mission non trouvée.");

            return mission;
        }

        public List<Mission> FindByVilleArrive(string nom)
        {
            return _db.missions.Include(m => m.Employer)
                               .Include(m => m.Vehicule)
                               .Include(m => m.Statut)
                               .Where(m => m.VilleArrive == nom)
                               .ToList();
        }

        public Mission Update(Mission mission, int id)
        {
            var existingMission = _db.missions.Find(id);
            if (existingMission == null)
                throw new KeyNotFoundException("Mission non trouvée.");

            existingMission.Raison = mission.Raison;
            existingMission.VilleDepart = mission.VilleDepart;
            existingMission.VilleArrive = mission.VilleArrive;
            existingMission.Distance = mission.Distance;
            existingMission.DateDebut = mission.DateDebut;
            existingMission.DateFin = mission.DateFin;

            // Mettre à jour les relations
            if (mission.EmployerId != existingMission.EmployerId)
            {
                var employer = _db.employers.Find(mission.EmployerId);
                if (employer != null)
                {
                    existingMission.Employer = employer;
                }
                else
                {
                    throw new ArgumentException("L'employé spécifié n'existe pas.");
                }
            }

            if (mission.VehiculeId.HasValue && mission.VehiculeId != existingMission.VehiculeId)
            {
                var vehicule = _db.vehicules.Find(mission.VehiculeId);
                if (vehicule != null)
                {
                    existingMission.Vehicule = vehicule;
                }
            }

            if (mission.StatutId != existingMission.StatutId)
            {
                var statut = _db.statuts.Find(mission.StatutId);
                if (statut != null)
                {
                    existingMission.Statut = statut;
                }
                else
                {
                    throw new ArgumentException("Le statut spécifié n'existe pas.");
                }
            }

            _db.SaveChanges();
            return existingMission;
        }
    }
}
