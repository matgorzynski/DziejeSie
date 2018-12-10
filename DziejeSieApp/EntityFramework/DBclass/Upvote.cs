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

        public dynamic Positive(int UserId, int EventId)
        {
            try
            {
                Users User = new Users();
                User = _dbcontext.User.Single(x => x.UserId == UserId);
            }
            catch
            {
                var Error = new
                {
                    Code = 1,
                    Type = "Upvote",
                    Desc = "User does not exist"
                };
                return Error;
            } // sprawdzanie czy istnieje użyszkodnik

            try
            {
                Events Event = new Events();
                Event = _dbcontext.Event.Single(x => x.EventId == EventId);
            }
            catch (System.Exception)
            {
                var Error = new
                {
                    Code = 2,
                    Type = "Upvote",
                    Desc = "Event does not exist"
                };
                return Error;
            } //sprawdzanie czy istnieje event o danym id

            //dodanie informacji do bazy
            Upvotes Upvote = new Upvotes();
            Upvote.EventId = EventId;
            Upvote.UserId = UserId;
            Upvote.Value = 1;

            _dbcontext.Upvote.Add(Upvote);
            _dbcontext.SaveCHanges();

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
            try
            {
                Users User = new Users();
                User = _dbcontext.User.Single(x => x.UserId == UserId);
            }
            catch
            {
                var Error = new
                {
                    Code = 1,
                    Type = "Upvote",
                    Desc = "User does not exist"
                };
                return Error;
            } // sprawdzanie czy istnieje użyszkodnik

            try
            {
                Events Event = new Events();
                Event = _dbcontext.Event.Single(x => x.EventId == EventId);
            }
            catch (System.Exception)
            {
                var Error = new
                {
                    Code = 2,
                    Type = "Upvote",
                    Desc = "Event does not exist"
                };
                return Error;
            } //sprawdzanie czy istnieje event o danym id

            //dodanie informacji do bazy
            Upvotes Upvote = new Upvotes();
            Upvote.EventId = EventId;
            Upvote.UserId = UserId;
            Upvote.Value = -1;

            _dbcontext.Upvote.Add(Upvote);
            _dbcontext.SaveCHanges();

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
            try
            {
                Events Event = new Events();
                Event = _dbcontext.Event.Single(x => x.EventId == EventId);
            }
            catch (System.Exception)
            {
                var Error = new
                {
                    Code = 2,
                    Type = "Upvote",
                    Desc = "Event does not exist"
                };
                return Error;
            } //sprawdzanie czy istnieje event o danym id

            int Points = _dbcontext.Upvote.Sum(x => x.EventId == EventId);
            return Points;
        }
    }
}
