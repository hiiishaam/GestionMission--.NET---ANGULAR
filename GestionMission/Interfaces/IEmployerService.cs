using GestionMission.Entities;

namespace GestionMission.Interfaces
{
    public interface IEmployerService
    {
        List<Employee> FindAll();
        Employee FindById(int id);
        List<Employee> FindByNom(string nom);
        Employee Add(Employee employer);
        Employee Update(Employee employer, int id);
        Employee Delete(int id);
    }
}
