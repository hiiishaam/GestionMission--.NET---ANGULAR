using GestionMission.Entities;
using Microsoft.EntityFrameworkCore;

namespace GestionMission.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Employer> employers { get; set; }
    }
}
