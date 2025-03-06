using GestionMission.Entities;

namespace GestionMission.Interfaces
{
    public interface ITeamService
    {
        List<Team> FindAll();
        Team FindById(int id);
        List<Team> FindByEmployerId(int employerId);
        Team Add(Team team);
        Team Update(Team team, int id);
        Team Delete(int id);
    }
}
