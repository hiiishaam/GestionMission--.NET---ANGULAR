using GestionMission.Entities;

namespace GestionMission.Interfaces
{
    public interface IMissionService
    {
        List<Mission> FindAll();
        Mission FindById(int id);
        List<Mission> FindByVilleArrive(string nom);
        Mission Add(Mission mission);
        Mission Update(Mission mission, int id);
        Mission Delete(int id);
        List<OrdreMissionDetails> GetOrdreMissionDetails(int missionId);
    }
}
