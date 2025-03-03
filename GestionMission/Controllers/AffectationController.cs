using GestionMission.Entities;
using GestionMission.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GestionMission.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AffectationController : ControllerBase
    {
        private readonly IAffectationService _service;

        public AffectationController(IAffectationService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<List<Affectation>> GetAll()
        {
            return Ok(_service.FindAll());
        }

        [HttpGet("{id}")]
        public ActionResult<Affectation> GetById(int id)
        {
            var affectation = _service.FindById(id);
            if (affectation == null)
            {
                return NotFound();
            }
            return Ok(affectation);
        }

        [HttpGet("search")]
        public ActionResult<List<Affectation>> GetByNom([FromQuery] string nom)
        {
            return Ok(_service.FindByNom(nom));
        }

        [HttpPost]
        public ActionResult<Affectation> Create([FromBody] Affectation affectation)
        {
            if (affectation == null)
            {
                return BadRequest("Invalid data.");
            }
            var createdAffectation = _service.Add(affectation);
            return CreatedAtAction(nameof(GetById), new { id = createdAffectation.Id }, createdAffectation);
        }

        [HttpPut("{id}")]
        public ActionResult<Affectation> Update(int id, [FromBody] Affectation affectation)
        {
            if (affectation == null)
            {
                return BadRequest("Invalid data.");
            }
            var updatedAffectation = _service.Update(affectation, id);
            if (updatedAffectation == null)
            {
                return NotFound();
            }
            return Ok(updatedAffectation);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var deletedAffectation = _service.Delete(id);

            if (deletedAffectation == null)
            {
                return NotFound(new { Message = $"Aucune affectation trouvée avec l'ID {id}" });
            }

            return Ok(new { Message = $"L'affectation avec l'ID {id} a été supprimé." });
        }
    }
}
