using GestionMission.Data;
using GestionMission.Entities;
using GestionMission.Interfaces;
using GestionMission.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace GestionMission.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployerController : ControllerBase
    {
        private readonly IEmployerService _service;

        public EmployerController(IEmployerService service)
        {
            _service = service;
        }

        // GET: api/employer
        [HttpGet]
        public ActionResult<List<Employee>> GetAll()
        {
            return Ok(_service.FindAll());
        }

        // GET: api/employer/{id}
        [HttpGet("{id}")]
        public ActionResult<Employee> GetById(int id)
        {
            var employer = _service.FindById(id);
            if (employer == null)
                return NotFound($"Aucun employé trouvé avec l'ID {id}");

            return Ok(employer);
        }

        // GET: api/employer/byname/{nom}
        [HttpGet("byname/{nom}")]
        public ActionResult<List<Employee>> GetByName(string nom)
        {
            var employers = _service.FindByNom(nom);
            if (employers.Count == 0)
                return NotFound($"Aucun employé trouvé avec le nom {nom}");

            return Ok(employers);
        }

        // POST: api/employer
        [HttpPost]
        public ActionResult<Employee> Create([FromBody] Employee employer)
        {
            if (employer == null)
                return BadRequest("Les données de l'employé sont invalides.");

            var newEmployer = _service.Add(employer);
            return CreatedAtAction(nameof(GetById), new { id = newEmployer.Id }, newEmployer);
        }

        // PUT: api/employer/{id}
        [HttpPut("{id}")]
        public ActionResult<Employee> Update(int id, [FromBody] Employee employer)
        {
            if (employer == null)
                return BadRequest("Les données de l'employé sont invalides.");

            var updatedEmployer = _service.Update(employer, id);
            if (updatedEmployer == null)
                return NotFound($"Aucun employé trouvé avec l'ID {id}");

            return Ok(updatedEmployer);
        }
       
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var deletedAffectation = _service.Delete(id);

            if (deletedAffectation == null)
            {
                return NotFound(new { Message = $"Aucun employé trouvé avec l'ID {id}" });
            }
            
            return Ok(new { Message = $"L'employé avec l'ID {id} a été supprimé." });
        }
    }
}