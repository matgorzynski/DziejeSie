using DziejeSieApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DziejeSieApp.DataBaseContext
{
    public class DziejeSieContext : DbContext
    {
       
            public DziejeSieContext(DbContextOptions<DziejeSieContext> options)
               : base(options)
            { }

            public DbSet<Users> User { get; set; }
            public DbSet<Events> Event { get; set; }
            public DbSet<Error> Error { get; set; }

       
    }
}
