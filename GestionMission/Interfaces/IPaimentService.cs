using GestionMission.Entities;

namespace GestionMission.Interfaces
{
    public interface IPaimentService
    {
        List<Payment> FindAll();
        Payment FindById(int id);
        Payment Add(Payment paiment);
        Payment Update(Payment paiment, int id);
        Payment Delete(int id);
    }
}
