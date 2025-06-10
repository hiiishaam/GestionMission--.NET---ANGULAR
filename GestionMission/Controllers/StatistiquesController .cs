using GestionMission.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GestionMission.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatistiquesController : ControllerBase
    {
        private readonly StatistiqueService _service;

        public StatistiquesController(StatistiqueService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var resultats = _service.GetStatistiques();
            return Ok(resultats);
        }
    }

}
