using EntityFramework.Models;
using Microsoft.EntityFrameworkCore;

namespace EntityFramework.DataBaseContext
{
    public class DziejeSieContext : DbContext
    {
        public DziejeSieContext(DbContextOptions<DziejeSieContext> options)
               : base(options)
        { }

        public DbSet<Users> User { get; set; }
        public DbSet<Events> Event { get; set; }
        public DbSet<Upvotes> Upvote { get; set; }

    }
}
