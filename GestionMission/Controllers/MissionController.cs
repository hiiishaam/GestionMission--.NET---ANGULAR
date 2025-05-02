using GestionMission.Entities;
using GestionMission.Interfaces;
using GestionMission.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace GestionMission.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MissionController : ControllerBase
    {
        private readonly IMissionService _service;

        public MissionController(IMissionService service)
        {
            _service = service;
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
        public ActionResult<Mission> Update(int id, [FromBody] Mission mission)
        {
            try
            {
                if (mission == null || id != mission.Id)
                    return BadRequest("Données invalides");

                var updatedMission = _service.Update(mission, id);
                if (updatedMission == null)
                    return NotFound();

                return Ok(updatedMission);
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                // _logger.LogError(ex, "An error occurred while updating the mission.");
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
