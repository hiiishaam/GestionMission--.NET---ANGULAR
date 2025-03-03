using GestionMission.Entities;

namespace GestionMission.Interfaces
{
    public interface IFonctionService
    {
        List<Fonction> FindAll();
        Fonction FindById(int id);
        List<Fonction> FindByNom(string nom);
        Fonction Add(Fonction fonction);
        Fonction Update(Fonction fonction, int id);
        Fonction Delete(int id);
    }
}
