using EntityFramework.DataBaseContext;
using EntityFramework.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EntityFramework.DBclass
{
    public class Upvote
    {
        private readonly DziejeSieContext _dbcontext;

        public Upvote(DziejeSieContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public dynamic Positive(int UserId, int EventId)
        {
            if(!UserExists(UserId))
            {
                var Error = new
                {
                    Code = 1,
                    Type = "Upvote",
                    Desc = "User does not exist"
                };
                return Error;
            } // sprawdzanie czy istnieje użyszkodnik

            if (!EventExists(EventId))
            {
                var Error = new
                {
                    Code = 2,
                    Type = "Upvote",
                    Desc = "Event does not exist"
                };
                return Error;
            } //sprawdzanie czy istnieje event o danym id

            int UpvoteValue = UpvoteExists(EventId, UserId);
            Upvotes Upvote = new Upvotes();

            if (UpvoteValue == 0)
            {
                //brak wpisu dla kombinacji UxE --> dodanie informacji do bazy
                Upvote.EventId = EventId;
                Upvote.UserId = UserId;
                Upvote.Value = 1;

                _dbcontext.Upvote.Add(Upvote);
                _dbcontext.SaveChanges();
            }
            else
            {
                if (UpvoteValue == 1)   //usuwanie wpisu
                {
                    Upvote = _dbcontext.Upvote.Single(x => x.UserId == UserId && x.EventId == EventId);

                    _dbcontext.Remove(Upvote);
                    _dbcontext.SaveChanges();
                }
                else if (UpvoteValue == -1) // modyfikowanie wpisu
                {
                    Upvote = _dbcontext.Upvote.Single(x => x.UserId == UserId && x.EventId == EventId);
                    Upvote.Value = 1;
                    
                    _dbcontext.SaveChanges();
                }
            }

            var Message = new
            {
                Code = 0,
                Type = "Upvote",
                Desc = "Success"
            };

            return Message;
        }

        public dynamic Negative(int UserId, int EventId)
        {
            if (!UserExists(UserId))
            {
                var Error = new
                {
                    Code = 1,
                    Type = "Upvote",
                    Desc = "User does not exist"
                };
                return Error;
            } // sprawdzanie czy istnieje użyszkodnik

            if (!EventExists(EventId))
            {
                var Error = new
                {
                    Code = 2,
                    Type = "Upvote",
                    Desc = "Event does not exist"
                };
                return Error;
            } //sprawdzanie czy istnieje event o danym id

            int UpvoteValue = UpvoteExists(EventId, UserId);
            Upvotes Upvote = new Upvotes();

            if (UpvoteValue == 0)
            {
                //brak wpisu dla kombinacji UxE --> dodanie informacji do bazy
                Upvote.EventId = EventId;
                Upvote.UserId = UserId;
                Upvote.Value = 1;

                _dbcontext.Upvote.Add(Upvote);
                _dbcontext.SaveChanges();
            }
            else
            {
                if (UpvoteValue == -1)   //usuwanie wpisu
                {
                    Upvote = _dbcontext.Upvote.Single(x => x.UserId == UserId && x.EventId == EventId);

                    _dbcontext.Remove(Upvote);
                    _dbcontext.SaveChanges();
                }
                else if (UpvoteValue == 1) // modyfikowanie wpisu
                {
                    Upvote = _dbcontext.Upvote.Single(x => x.UserId == UserId && x.EventId == EventId);
                    Upvote.Value = -1;

                    _dbcontext.SaveChanges();
                }
            }

            var Message = new
            {
                Code = 0,
                Type = "Upvote",
                Desc = "Success"
            };
            return Message;
        }

        public dynamic Points(int EventId)
        {
            if(!EventExists(EventId))
            {
                var Error = new
                {
                    Code = 2,
                    Type = "Upvote",
                    Desc = "Event does not exist"
                };
                return Error;
            } //sprawdzanie czy istnieje event o danym id

            int Points = _dbcontext.Upvote
                .Where(e => e.EventId == EventId)
                .Select(e => e.Value)
                .Sum();

            return Points;
        }

        private bool UserExists (int UserId)
        {
            try
            {
                Users User = new Users();
                User = _dbcontext.User.Single(x => x.IdUser == UserId);
            }
            catch
            {
                return false;
            }
            return true;
        }

        private bool EventExists(int EventId)
        {
            try
            {
                Events Event = new Events();
                Event = _dbcontext.Event.Single(x => x.EventId == EventId);
            }
            catch (System.Exception)
            {
                return false;
            }
            return true;
        }

        private int UpvoteExists(int EventId, int UserId)
        {
            try
            {
                Upvotes Upvote = new Upvotes();
                Upvote = _dbcontext.Upvote.Single(x => x.EventId == EventId && x.UserId == UserId);

                return Upvote.Value; // 1 || -1 
            }
            catch (System.Exception)
            {
                return 0;   // brak wpisu
            }
        }
    }
}
