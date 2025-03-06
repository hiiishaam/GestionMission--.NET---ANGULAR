using GestionMission.Entities;
using GestionMission.Interfaces;
using GestionMission.Services;
using Microsoft.AspNetCore.Mvc;

namespace GestionMission.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ITeamService _teamService;

        public TeamController(ITeamService teamService)
        {
            _teamService = teamService;
        }

        // GET: api/team
        [HttpGet]
        public ActionResult<List<Team>> GetAllTeams()
        {
            var teams = _teamService.FindAll();
            return Ok(teams);
        }

        // GET: api/team/{id}
        [HttpGet("{id}")]
        public ActionResult<Team> GetTeamById(int id)
        {
            var team = _teamService.FindById(id);
            if (team == null)
            {
                return NotFound();
            }
            return Ok(team);
        }

        // POST: api/team
        [HttpPost]
        public ActionResult<Team> CreateTeam([FromBody] Team team)
        {
            if (team == null)
            {
                return BadRequest();
            }

            var createdTeam = _teamService.Add(team);
            return CreatedAtAction(nameof(GetTeamById), new { id = createdTeam.Id }, createdTeam);
        }

        // PUT: api/team/{id}
        [HttpPut("{id}")]
        public ActionResult<Team> UpdateTeam(int id, [FromBody] Team team)
        {
            var updatedTeam = _teamService.Update(team, id);
            if (updatedTeam == null)
            {
                return NotFound();
            }
            return Ok(updatedTeam);
        }

        // DELETE: api/team/{id}
        [HttpDelete("{id}")]
        public ActionResult<Team> DeleteTeam(int id)
        {
            var deletedTeam = _teamService.Delete(id);
            if (deletedTeam == null)
            {
                return NotFound();
            }
            return Ok(deletedTeam);
        }
    }
}
