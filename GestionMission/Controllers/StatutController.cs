using GestionMission.Entities;
using GestionMission.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace GestionMission.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatutController : ControllerBase
    {
        private readonly IStatutService _service;

        public StatutController(IStatutService statut)
        {
            _service = statut;
        }
        [HttpGet]
        public ActionResult<List<Statut>> GetAll()
        {
            return Ok(_service.FindAll());
        }
        [HttpGet("{id}")]
        public ActionResult<Statut> GetById(int id)
        {
            var statut = _service.FindById(id);
            if (statut == null)
            {
                return NotFound();
            }
            return Ok(statut);
        }
        [HttpGet("search")]
        public ActionResult<List<Statut>> GetByNom([FromQuery] string nom)
        {
            return Ok(_service.FindByNom(nom));
        }

        [HttpPost]
        public ActionResult<Statut> Create([FromBody] Statut statut)
        {
            if (statut == null)
            {
                return BadRequest("Invalid data.");
            }
            var createdStatut = _service.Add(statut);
            return CreatedAtAction(nameof(GetById), new { id = createdStatut.Id }, createdStatut);
        }

        [HttpPut("{id}")]
        public ActionResult<Statut> Update(int id, [FromBody] Statut statut)
        {
            if (statut == null)
            {
                return BadRequest("Invalid data.");
            }
            var updatedStatut = _service.Update(statut, id);
            if (updatedStatut == null)
            {
                return NotFound();
            }
            return Ok(updatedStatut);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var deletedstatut = _service.Delete(id);

            if (deletedstatut == null)
            {
                return NotFound(new { Message = $"Aucune statut trouvée avec l'ID {id}" });
            }

            return Ok(new { Message = $"Le statut avec l'ID {id} a été supprimé." });
        }
    }
}
