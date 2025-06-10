using GestionMission.Data;
using GestionMission.Model;
using Microsoft.EntityFrameworkCore;

namespace GestionMission.Services
{
    public class StatistiqueService
    {
        private readonly AppDbContext _db;

        public StatistiqueService(AppDbContext db)
        {
            _db = db;
        }

        public List<StatistiqueDto> GetStatistiques()
        {
            var statistiques = new List<StatistiqueDto>();

            using (var connection = _db.Database.GetDbConnection())
            {
                connection.Open();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "Statistiques";
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    using (var reader = command.ExecuteReader())
                    {
                        do
                        {
                            while (reader.Read())
                            {
                                statistiques.Add(new StatistiqueDto
                                {
                                    Type = reader["Type"].ToString(),
                                    Statut = reader["Statut"].ToString(),
                                    Nombre = Convert.ToInt32(reader["Nombre"])
                                });
                            }
                        } while (reader.NextResult());
                    }
                }
            }

            return statistiques;
        }
    }
}
