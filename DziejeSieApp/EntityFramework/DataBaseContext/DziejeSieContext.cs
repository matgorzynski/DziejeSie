using EntityFramework.Models;
using Microsoft.EntityFrameworkCore;

namespace EntityFramework.DataBaseContext
{
    public class DziejeSieContext : DbContext
    {
        public DziejeSieContext()
           : base()
        {
        }

        public DbSet<Users> User { get; set; }
            public DbSet<Events> Event { get; set; }
       
    }
}
