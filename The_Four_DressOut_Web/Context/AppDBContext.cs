using Microsoft.EntityFrameworkCore;
using The_Four_DressOut_Web.Model;

namespace The_Four_DressOut_Web.Context
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
    }
}
