using GestionMission.Entities;
using GestionMission.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace GestionMission.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiculeController : ControllerBase
    {
        private readonly IVehiculeService _service;

        public VehiculeController(IVehiculeService vehicule)
        {
            _service = vehicule;
        }
        [HttpGet]
        public ActionResult<List<Vehicule>> GetAll()
        {
            return Ok(_service.FindAll());
        }
        [HttpGet("{id}")]
        public ActionResult<Vehicule> GetById(int id)
        {
            var vehicule = _service.FindById(id);
            if (vehicule == null)
            {
                return NotFound();
            }
            return Ok(vehicule);
        }
        [HttpGet("search")]
        public ActionResult<List<Vehicule>> GetByNom([FromQuery] string nom)
        {
            return Ok(_service.FindByNom(nom));
        }

        [HttpPost]
        public ActionResult<Vehicule> Create([FromBody] Vehicule vehicule)
        {
            if (vehicule == null)
            {
                return BadRequest("Invalid data.");
            }
            var createdVehicule = _service.Add(vehicule);
            return CreatedAtAction(nameof(GetById), new { id = createdVehicule.Id }, createdVehicule);
        }

        [HttpPut("{id}")]
        public ActionResult<Vehicule> Update(int id, [FromBody] Vehicule vehicule)
        {
            if (vehicule == null)
            {
                return BadRequest("Invalid data.");
            }
            var updatedVehicule = _service.Update(vehicule, id);
            if (updatedVehicule == null)
            {
                return NotFound();
            }
            return Ok(updatedVehicule);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var deletedVehicule = _service.Delete(id);

            if (deletedVehicule == null)
            {
                return NotFound(new { Message = $"Aucune vehicule trouvée avec l'ID {id}" });
            }

            return Ok(new { Message = $"La vehicule avec l'ID {id} a été supprimé." });
        }
    }
}
