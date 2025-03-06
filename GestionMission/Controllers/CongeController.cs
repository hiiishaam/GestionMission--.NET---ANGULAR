using GestionMission.Entities;
using GestionMission.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace GestionMission.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CongeController : ControllerBase
    {
        private readonly ICongeService _service;

        public CongeController(ICongeService conge)
        {
            _service = conge;
        }

        [HttpGet]
        public ActionResult<List<Conge>> GetAll()
        {
            return Ok(_service.FindAll());
        }

        [HttpGet("{id}")]
        public ActionResult<Conge> GetById(int id)
        {
            var conge = _service.FindById(id);
            if (conge == null)
            {
                return NotFound();
            }
            return Ok(conge);
        }

        [HttpGet("search")]
        public ActionResult<List<Conge>> FindByDateDebut(string date)
        {
            var conges = _service.FindByDateDebut(date);
            if (conges == null || conges.Count == 0)
            {
                return NotFound(new { Message = "Aucun congé trouvé pour cette date." });
            }
            return Ok(conges);
        }

        [HttpPost]
        public ActionResult<Conge> Create([FromBody] Conge conge)
        {
            if (conge == null)
            {
                return BadRequest("Invalid data.");
            }

            var createdConge = _service.Add(conge);
            return CreatedAtAction(nameof(GetById), new { id = createdConge.Id }, createdConge);
        }

        [HttpPut("{id}")]
        public ActionResult<Conge> Update(int id, [FromBody] Conge conge)
        {
            if (conge == null)
            {
                return BadRequest("Invalid data.");
            }

            var updatedConge = _service.Update(conge, id);
            if (updatedConge == null)
            {
                return NotFound();
            }

            return Ok(updatedConge);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var deletedConge = _service.Delete(id);

            if (deletedConge == null)
            {
                return NotFound(new { Message = $"Aucun congé trouvé avec l'ID {id}" });
            }

            return Ok(new { Message = $"Le congé avec l'ID {id} a été supprimé." });
        }
    }
}
