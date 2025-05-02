using GestionMission.Data;
using GestionMission.Entities;
using GestionMission.Interfaces;


namespace GestionMission.Services
{
    public class StatutService : IStatutService
    {
        private readonly AppDbContext _db;

        public StatutService(AppDbContext db)
        {
            _db = db;
        }

        public Statut Add(Statut statut)
        {
            statut.CreateDate = DateTime.UtcNow;
            statut.UpdateDate = DateTime.UtcNow;
            _db.statuts.Add(statut);
            _db.SaveChanges();
            return statut;
        }

        public Statut Delete(int id)
        {
            var statut = _db.statuts.Find(id);
            if (statut != null)
            {
                _db.statuts.Remove(statut);
                _db.SaveChanges();
            }
            return statut;
        }

        public List<Statut> FindAll()
        {
            return _db.statuts.ToList();
        }

        public Statut FindById(int id)
        {
            return _db.statuts.Find(id);
        }

        public List<Statut> FindByNom(string nom)
        {
            return _db.statuts.Where(e => e.Name.Contains(nom)).ToList();
        }

        public Statut Update(Statut statut, int id)
        {
            var existingStatut = _db.statuts.Find(id);
            if (existingStatut != null)
            {
                existingStatut.Name = statut.Name;
                existingStatut.Actif = statut.Actif;
                _db.SaveChanges();
            }
            return existingStatut;
        }
    }
}
