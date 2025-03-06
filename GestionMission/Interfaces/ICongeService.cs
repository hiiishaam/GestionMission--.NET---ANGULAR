using GestionMission.Entities;

namespace GestionMission.Interfaces
{
    public interface ICongeService
    {
        List<Conge> FindAll();
        Conge FindById(int id);
        List<Conge> FindByDateDebut(string date);
        Conge Add(Conge conge);
        Conge Update(Conge conge, int id);
        Conge Delete(int id);
    }
}
