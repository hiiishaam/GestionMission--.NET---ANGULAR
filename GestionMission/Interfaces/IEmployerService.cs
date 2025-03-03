using GestionMission.Entities;

namespace GestionMission.Interfaces
{
    public interface IEmployerService
    {
        List<Employer> FindAll();
        Employer FindById(int id);
        List<Employer> FindByNom(string nom);
        Employer Add(Employer employer);
        Employer Update(Employer employer, int id);
        Employer Delete(int id);
    }
}
