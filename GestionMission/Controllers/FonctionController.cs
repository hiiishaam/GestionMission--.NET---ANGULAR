using GestionMission.Entities;
using GestionMission.Interfaces;
using GestionMission.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GestionMission.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FonctionController : ControllerBase
    {
        private readonly IFonctionService _service;

        public FonctionController(IFonctionService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<List<Fonction>> GetAll()
        {
            return Ok(_service.FindAll());
        }

        [HttpGet("{id}")]
        public ActionResult<Fonction> GetById(int id)
        {
            var fonction = _service.FindById(id);
            if (fonction == null)
            {
                return NotFound();
            }
            return Ok(fonction);
        }

        [HttpGet("search")]
        public ActionResult<List<Fonction>> GetByNom([FromQuery] string nom)
        {
            return Ok(_service.FindByNom(nom));
        }

        [HttpPost]
        public ActionResult<Fonction> Create([FromBody] Fonction fonction)
        {
            if (fonction == null)
            {
                return BadRequest("Invalid data.");
            }
            var createdFonction = _service.Add(fonction);
            return CreatedAtAction(nameof(GetById), new { id = createdFonction.Id }, createdFonction);
        }

        [HttpPut("{id}")]
        public ActionResult<Fonction> Update(int id, [FromBody] Fonction fonction)
        {
            if (fonction == null)
            {
                return BadRequest("Invalid data.");
            }
            var updatedFonction = _service.Update(fonction, id);
            if (updatedFonction == null)
            {
                return NotFound();
            }
            return Ok(updatedFonction);
        }


        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var deletedAffectation = _service.Delete(id);

            if (deletedAffectation == null)
            {
                return NotFound(new { Message = $"Aucune fonction trouvée avec l'ID {id}" });
            }

            return Ok(new { Message = $"La fonction avec l'ID {id} a été supprimé." });
        }
    }
}
