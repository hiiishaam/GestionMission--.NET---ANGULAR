using GestionMission.Entities;

namespace GestionMission.Interfaces
{
    public interface IPaimentService
    {
        List<Paiment> FindAll();
        Paiment FindById(int id);
        Paiment Add(Paiment paiment);
        Paiment Update(Paiment paiment, int id);
        Paiment Delete(int id);
    }
}
