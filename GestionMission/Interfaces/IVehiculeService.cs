using GestionMission.Entities;

namespace GestionMission.Interfaces
{
    public interface IVehiculeService
    {
        List<Vehicule> FindAll();
        Vehicule FindById(int id);
        List<Vehicule> FindByNom(string nom);
        Vehicule Add(Vehicule vehicule);
        Vehicule Update(Vehicule vehicule, int id);
        Vehicule Delete(int id);
    }
}
