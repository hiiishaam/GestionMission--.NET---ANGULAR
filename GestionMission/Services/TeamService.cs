using GestionMission.Data;
using GestionMission.Entities;
using GestionMission.Interfaces;

namespace GestionMission.Services
{
    public class TeamService : ITeamService
    {
        private readonly AppDbContext _db;

        public TeamService(AppDbContext db)
        {
            _db = db;
        }

        public Team Add(Team team)
        {
            _db.teams.Add(team);
            _db.SaveChanges();
            return team;
        }

        public Team Delete(int id)
        {
            var team = _db.teams.Find(id);
            if (team != null)
            {
                _db.teams.Remove(team);
                _db.SaveChanges();
            }
            return team;
        }

        public List<Team> FindAll()
        {
            return _db.teams.ToList();
        }

        public Team FindById(int id)
        {
            return _db.teams.Find(id);
        }

        public List<Team> FindByEmployerId(int employerId)
        {
            return _db.teams.Where(t => t.EmployerId == employerId).ToList();
        }

        public Team Update(Team team, int id)
        {
            var existingTeam = _db.teams.Find(id);
            if (existingTeam != null)
            {
                existingTeam.EmployerId = team.EmployerId;
                existingTeam.MissionId = team.MissionId;
                _db.SaveChanges();
            }
            return existingTeam;
        }
    }
}
