using Microsoft.EntityFrameworkCore;
using The_Four_DressOut_Web.Model;

namespace The_Four_DressOut_Web.Context
{
    public class AppDbContext : DbContext  
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
    }
}