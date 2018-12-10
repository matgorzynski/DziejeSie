using EntityFramework.DataBaseContext;
using EntityFramework.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace EntityFramework.DBclass
{
    class Upvote
    {
        private readonly DziejeSieContext _dbcontext;

        public Upvote(DziejeSieContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public dynamic Positive (int UserId, int EventId)
        {
            try
            {
                Users User = new Users();
                User 
            }
        }
    }
}
