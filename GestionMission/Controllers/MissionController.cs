using GestionMission.Entities;
using GestionMission.Interfaces;
using GestionMission.Model;
using Microsoft.AspNetCore.Mvc;

namespace GestionMission.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MissionController : ControllerBase
    {
        private readonly IMissionService _service;
        private readonly ITeamService _teamService;
        private readonly IStatutService _statutService;
        private readonly IPaimentService _paimentService;
        /// <summary>
        /// MissionController
        /// </summary>
        /// <param name="service"></param>
        /// <param name="teamService"></param>
        /// <param name="statutService"></param>
        public MissionController(IMissionService service, ITeamService teamService, IStatutService statutService, IPaimentService paimentService)
        {
            _service = service;
            _teamService = teamService;
            _statutService = statutService;
            _paimentService = paimentService;
        }

        [HttpGet]
        public ActionResult<List<Mission>> GetAll()
        {
            try
            {
                var missions = _service.FindAll();
                return Ok(missions);
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                // _logger.LogError(ex, "An error occurred while fetching all missions.");
                return StatusCode(500, "Une erreur interne est survenue. Veuillez réessayer plus tard.");
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Mission> GetById(int id)
        {
            try
            {
                var mission = _service.FindById(id);
                if (mission == null)
                    return NotFound();
                return Ok(mission);
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                // _logger.LogError(ex, "An error occurred while fetching the mission.");
                return StatusCode(500, "Une erreur interne est survenue. Veuillez réessayer plus tard.");
            }
        }

        [HttpGet("byville/{nom}")]
        public ActionResult<List<Mission>> GetByVilleArrive(string nom)
        {
            try
            {
                var missions = _service.FindByVilleArrive(nom);
                return Ok(missions);
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                // _logger.LogError(ex, "An error occurred while fetching missions by ville.");
                return StatusCode(500, "Une erreur interne est survenue. Veuillez réessayer plus tard.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Mission>> Create([FromBody] MissionDto dto)
        {
            try
            {
                if (dto == null)
                    return BadRequest("Mission invalide");
                // Création de l’objet Mission à partir du DTO
                var mission = new Mission
                {
                    Raison = dto.Description,

                    DateDebut = DateTime.Parse(dto.DateDepartString),
                    DateFin = DateTime.Parse(dto.DateRetourString),
                    VehiculeId = dto.VehiculeId,
                    StatutId = dto.StatutId,
                    UpdatedById = dto.UpdatedById,
                    CreatedById = dto.CreatedById,
                    VilleDepart = string.Empty,
                    VilleArrive = dto.villeArrive
                };

                var createdMission = _service.Add(mission);
                return CreatedAtAction(nameof(GetById), new { id = createdMission.Id }, createdMission);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Une erreur interne est survenue. Veuillez réessayer plus tard.");
            }
        }

        [HttpPut("{id}")]
        public ActionResult<Mission> Update(int id, [FromBody] MissionTeamsVehiculeDto mission)
        {
            try
            {
                var missiondb = _service.FindById(id);
                bool update = false;
                if (missiondb != null)
                {
                    if(missiondb.VehiculeId != mission.VehiculeId)
                    {
                        missiondb.VehiculeId = mission.VehiculeId;
                        update = true;
                    }
                    if (missiondb.EmployerId != mission.EmployeId)
                    {
                        missiondb.EmployerId = mission.EmployeId;
                        update = true;
                    }

                    if(update)
                    {
                        missiondb.UpdatedById = mission.UpdatedById;
                        missiondb = _service.Update(missiondb, id);
                    }

                    var teamlist = _teamService.FindByMissionId(id);
                    var teamListDto = mission.EmployeIds != null ? mission.EmployeIds.Select(employeid => new Team
                    {
                        Actif = true,
                        CreatedById = mission.CreatedById,
                        EmployeeId = employeid,
                        UpdatedById = mission.UpdatedById,
                        MissionId = id,
                    }).ToList() : null;

                    
                    var res = Helpers.Helper.CompareLists(teamlist, teamListDto);
                   if(res.onlyInFirst != null && res.onlyInFirst.Any())
                    {
                        foreach(var team in res.onlyInFirst)
                        {
                            _teamService.Delete(team.Id);
                        }
                    }
                    if (res.onlyInSecond != null && res.onlyInSecond.Any())
                    {
                        foreach (var team in res.onlyInSecond)
                        {
                            _teamService.Add(team);
                        }
                    }

                }

                if (missiondb == null)
                    return NotFound();

                return Ok(missiondb);
            }
            catch (Exception ex)
            {
        
                return StatusCode(500, "Une erreur interne est survenue. Veuillez réessayer plus tard.");
            }
        }

        [HttpPut("UpdateStatus/{id}")]
        public ActionResult<Mission> UpdateStatue(int id, [FromBody] MissionStatus mission)
        {
            try
            {
                var missiondb = _service.FindById(id);

                if (missiondb != null && mission.StatutId.HasValue && missiondb.StatutId != mission.StatutId)
                {
                    missiondb.StatutId = mission.StatutId;
                    missiondb.UpdatedById = mission.UpdatedById;
                    missiondb = _service.Update(missiondb, id);
                    var status = _statutService.FindAll();

                    if (missiondb.StatutId == status.First(e => e.Code == "Cloture").Id)
                    {
                        Payment paiment = new Payment
                        {
                            CreatedById = mission.UpdatedById,
                            UpdatedById = mission.UpdatedById,
                            MissionId = missiondb.Id,
                            
                        };
                        _paimentService.Add(paiment);
                    }
                }

                if (missiondb == null)
                    return NotFound();

                return Ok(missiondb);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Une erreur interne est survenue. Veuillez réessayer plus tard.");
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var teamlist = _teamService.FindByMissionId(id);
                if(teamlist != null && teamlist.Any())
                {
                    teamlist.ForEach(e => _teamService.Delete(e.Id));
                }
                var deletedMission = _service.Delete(id);
                if (deletedMission == null)
                    return NotFound();

                return NoContent();
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                // _logger.LogError(ex, "An error occurred while deleting the mission.");
                return StatusCode(500, "Une erreur interne est survenue. Veuillez réessayer plus tard.");
            }
        }

        /// <summary>
        /// GetOrdreMissionDetails
        /// </summary>
        /// <param name="missionId"></param>
        /// <returns></returns>
        [HttpGet("ordre-mission-details/{missionId}")]
        public ActionResult<List<Model.OrdreMissionDetails>> GetOrdreMissionDetails(int missionId)
        {
            try
            {
                var result =  _service.GetOrdreMissionDetails(missionId);

                result = result ?? [];
                
                return Ok(Helpers.Helper.ConvertList(result));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Une erreur s'est produite : {ex.Message}");
            }
        }

        /// <summary>
        /// GetEmployeesDisponibles
        /// </summary>
        /// <param name="missionId"></param>
        /// <returns></returns>
        [HttpGet("employees-disponibles/{missionId}")]
        public ActionResult<List<Model.EmployeeDisponible>> GetEmployeesDisponibles(int missionId)
        {
            try
            {
                var result = _service.GetEmployeesDisponibles(missionId);
                result = result ?? [];

                return Ok(Helpers.Helper.ConvertList(result));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Une erreur s'est produite : {ex.Message}");
            }
        }

        /// <summary>
        /// GetVehiculesDisponibles
        /// </summary>
        /// <param name="missionId"></param>
        /// <returns></returns>
        [HttpGet("vehicules-disponibles/{missionId}")]
        public ActionResult<List<Model.VehiculeDisponible>> GetVehiculesDisponibles(int missionId)
        {
            try
            {
                var result = _service.GetVehiculesDisponibles(missionId);
                result = result ?? [];

                return Ok(Helpers.Helper.ConvertList(result));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Une erreur s'est produite : {ex.Message}");
            }
        }

    }
}
