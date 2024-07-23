using CRUDTASK12.Models;
using Microsoft.EntityFrameworkCore;

namespace CRUDTASK12.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
          : base(options)
        {

        }

        public DbSet<Customeraz> Customers { get; set; }
    }
}
    