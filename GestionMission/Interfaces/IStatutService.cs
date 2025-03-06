using GestionMission.Entities;

namespace GestionMission.Interfaces
{
    public interface IStatutService
    {
        List<Statut> FindAll();
        Statut FindById(int id);
        List<Statut> FindByNom(string nom);
        Statut Add(Statut statut);
        Statut Update(Statut statut, int id);
        Statut Delete(int id);
    }
}
