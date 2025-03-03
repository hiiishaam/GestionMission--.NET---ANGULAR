using GestionMission.Entities;

namespace GestionMission.Interfaces
{
    public interface IAffectationService
    {
        List<Affectation> FindAll();
        Affectation FindById(int id);
        List<Affectation> FindByNom(string nom);
        Affectation Add(Affectation affectation);
        Affectation Update(Affectation affectation, int id);
        Affectation Delete(int id);
    }
}
