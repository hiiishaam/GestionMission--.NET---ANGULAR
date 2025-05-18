using GestionMission.Data;
using GestionMission.Entities;
using GestionMission.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GestionMission.Services
{
    /// <summary>
    /// mission service
    /// </summary>
    public class MissionService : IMissionService
    {
        /// <summary>
        /// variable db
        /// </summary>
        private readonly AppDbContext _db;

        /// <summary>
        /// MissionService
        /// </summary>
        /// <param name="db"></param>
        public MissionService(AppDbContext db)
        {
            _db = db;
        }

        /// <summary>
        /// add misiion
        /// </summary>
        /// <param name="mission"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="InvalidOperationException"></exception>
        public Mission Add(Mission mission)
        {
            if (mission == null)
                throw new ArgumentNullException(nameof(mission), "La mission ne peut pas être nulle.");

            try
            {
                // Validation de la date
                if (mission.DateDebut >= mission.DateFin)
                    throw new ArgumentException("La date de fin doit être après la date de début.");

                // Vérifier et attacher l'Employer
                var employer = _db.employees.Find(mission.EmployerId);
                if (employer != null)
                {
                    mission.Employer = employer;
                }
                //else
                //{
                //    throw new ArgumentException("L'employé spécifié n'existe pas.", nameof(mission.EmployerId));
                //}

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

                // Vérifier et attacher le CreatedBy (facultatif)
                if (mission.CreatedById.HasValue)
                {
                    var createdBy = _db.users.Find(mission.CreatedById);
                    if (createdBy != null)
                    {
                        mission.CreatedBy = createdBy;
                    }
                    else
                    {
                        throw new ArgumentException("L'utilisateur (CreatedBy) spécifié n'existe pas.", nameof(mission.CreatedById));
                    }
                }

                // Vérifier et attacher le UpdatedBy (facultatif)
                if (mission.UpdatedById.HasValue)
                {
                    var updatedBy = _db.users.Find(mission.UpdatedById);
                    if (updatedBy != null)
                    {
                        mission.UpdatedBy = updatedBy;
                    }
                    else
                    {
                        throw new ArgumentException("L'utilisateur (UpdatedBy) spécifié n'existe pas.", nameof(mission.UpdatedById));
                    }
                }

                // Ajouter la mission à la base de données
                _db.missions.Add(mission);
                _db.SaveChanges();

                return mission;
            }
            catch (ArgumentException ex)
            {
                // Loguer l'erreur ici si nécessaire
                throw new InvalidOperationException("Erreur de validation des paramètres de mission.", ex);
            }
            catch (Exception ex)
            {
                // Loguer l'erreur générale ici
                throw new InvalidOperationException("Une erreur inattendue est survenue lors de l'ajout de la mission.", ex);
            }
        }

        /// <summary>
        /// delete mission
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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
            
            //existingMission = mission.Actif;
            existingMission.UpdatedById = mission.UpdatedById;

            // Mettre à jour les relations
            if (mission.EmployerId != existingMission.EmployerId)
            {
                var employer = _db.employees.Find(mission.EmployerId);
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

        /// <summary>
        /// GetOrdreMissionDetails
        /// </summary>
        /// <param name="missionId"></param>
        /// <returns></returns>
        public List<OrdreMissionDetails> GetOrdreMissionDetails(int missionId)
        {
            var results = _db.Set<OrdreMissionDetails>()
                .FromSqlRaw("EXEC GetOrdreMissionDetails @mission_id = {0}", missionId)
                .ToList();

            return results;
        }

        /// <summary>
        /// GetVehiculesDisponibles
        /// </summary>
        /// <param name="missionId"></param>
        /// <returns></returns>
        public List<VehiculeDisponible> GetVehiculesDisponibles(int missionId)
        {
            var results = _db.Set<VehiculeDisponible>()
                .FromSqlRaw("EXEC GetVehiculesDisponibles @IdMission = {0}", missionId)
                .ToList();

            return results;
        }

        /// <summary>
        /// GetEmployeesDisponibles
        /// </summary>
        /// <param name="missionId"></param>
        /// <returns></returns>
        public List<EmployeeDisponible> GetEmployeesDisponibles(int missionId)
        {
            var results = _db.Set<EmployeeDisponible>()
                .FromSqlRaw("EXEC GetEmployeesDisponibles @IdMission = {0}", missionId)
                .ToList();
            return results;
        }

    }
}
