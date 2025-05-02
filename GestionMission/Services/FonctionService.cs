using GestionMission.Data;
using GestionMission.Entities;
using GestionMission.Interfaces;

namespace GestionMission.Services
{
    public class FonctionService : IFonctionService
    {
        private AppDbContext _db;

        public FonctionService(AppDbContext db)
        {
            _db = db;
        }

        public Fonction Add(Fonction fonction)
        {
            fonction.CreateDate = DateTime.UtcNow;
            fonction.UpdateDate = DateTime.UtcNow;
            _db.fonctions.Add(fonction);
            _db.SaveChanges();
            return fonction;

        }

        public Fonction Delete(int id)
        {
            var fonction = _db.fonctions.Find(id);
            if (fonction != null)
            {
                _db.fonctions.Remove(fonction);
                _db.SaveChanges();
            }
            return fonction;
        }

        public List<Fonction> FindAll()
        {
            return _db.fonctions.ToList();
        }

        public Fonction FindById(int id)
        {
            return _db.fonctions.Find(id);
        }

        public List<Fonction> FindByNom(string nom)
        {
            return _db.fonctions.Where(e => e.Name.Contains(nom)).ToList();
        }

        public Fonction Update(Fonction fonction, int id)
        {
            var existingfonction = _db.fonctions.Find(id);
            if (existingfonction != null)
            {
                existingfonction.Name = fonction.Name;
                existingfonction.Actif = fonction.Actif;
                existingfonction.UpdatedById = fonction.UpdatedById;
                existingfonction.UpdateDate = DateTime.UtcNow;
                _db.SaveChanges();
            }
            return existingfonction;
        }
    }
}
