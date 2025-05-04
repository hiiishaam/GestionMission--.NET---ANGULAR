using GestionMission.Entities;
using GestionMission.Interfaces;
using GestionMission.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace GestionMission.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MissionController : ControllerBase
    {
        private readonly IMissionService _service;
        private readonly ITeamService _teamService;

        public MissionController(IMissionService service, ITeamService teamService)
        {
            _service = service;
            _teamService = teamService;
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

                    DateDebut = dto.DateDebut,
                    DateFin = dto.DateFin,
                    EmployerId = dto.EmployeId,
                    VehiculeId = dto.VehiculeId,
                    StatutId = dto.StatutId,
                    UpdatedById = dto.UpdatedById,
                    CreatedById = dto.CreatedById,
                    VilleArrive = string.Empty,
                    VilleDepart = string.Empty
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

                if (missiondb != null)
                {
                    if(missiondb.VehiculeId != mission.VehiculeId)
                    {
                        missiondb.VehiculeId = mission.VehiculeId;
                        missiondb.UpdatedById = mission.UpdatedById;
                        missiondb =   _service.Update(missiondb, id);
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

                    
                    var res = Helpers.Helpre.CompareLists(teamlist, teamListDto);
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

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
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
    }
}
