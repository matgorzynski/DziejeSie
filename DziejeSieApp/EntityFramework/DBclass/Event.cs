using EntityFramework.DataBaseContext;
using System.Linq;
using EntityFramework.Models;
using Microsoft.AspNetCore.Mvc;

namespace EntityFramework.DBclass
{
    public class Event
    {
        private readonly DziejeSieContext _dbcontext;

        public Event(DziejeSieContext dbcontext)
        {
            _dbcontext = dbcontext;

        }

        public dynamic AllEvent()
        {
            var Event = _dbcontext.Event;
            return Event;
        }


        public dynamic GetEventById(int id)
        {
            try
            {
                Events Events = new Events();
                Events = _dbcontext.Event.Single(x => x.EventId == id);
                try
                {
                    Users User = new Users();
                    User = _dbcontext.User.Single(x => x.IdUser == Events.UserId);
                    var Event = new
                    {
                        EventId = Events.EventId,
                        Name = Events.Name,
                        Address = Events.Address,
                        Postcode = Events.Postcode,
                        Town = Events.Town,
                        User = User.Login,
                        EventDate = Events.EventDate.ToString("dd-MM-yyy"),
                        EventHour = Events.EventDate.ToString("HH:mm")

                    };
                    return Event;
                }
                catch (System.Exception)
                {
                    var Error = new
                    {
                        EventId = Events.EventId,
                        Name = Events.Name,
                        Address = Events.Address,
                        Postcode = Events.Postcode,
                        Town = Events.Town,
                        User = "[deleted]",
                        EventDate = Events.EventDate.ToString("dd-MM-yyy"),
                        EventHour = Events.EventDate.ToString("HH:mm")
                    };
                    return Error;
                }
            }
            catch (System.Exception)
            {
                var Error = new
                {
                    Code = 2,
                    Type = "GetSingleEvent",
                    Desc = "There is no event with specified ID"
                };
                return Error;
            }
        }


        public dynamic AddNewEvent([FromBody]Events events)
        {

            _dbcontext.Event.Add(events);
            _dbcontext.SaveChanges();

            Users User = new Users();
            User = _dbcontext.User.Single(x => x.IdUser == events.UserId);
            var Event = new
            {
                EventId = events.EventId,
                Name = events.Name,
                Address = events.Address,
                Postcode = events.Postcode,
                Town = events.Town,
                User = User.Login,
                EventDate = events.EventDate.ToString("dd-MM-yyy"),
                EventHour = events.EventDate.ToString("HH:mm")

            };
            return Event;
        }



        public dynamic UpdateEvent(int id, [FromBody]Events events)
        {
            Events toModify = new Events();
            Users User = new Users();

            try
            {
                toModify = _dbcontext.Event.Single(x => x.EventId.Equals(id));
            }
            catch (System.Exception)
            {
                var Error = new
                {
                    Code = 2,
                    Type = "EventModify",
                    Desc = "There is no event with specified ID"
                };
                return Error;
            }

            if (events.Name != null || events.Name != "") toModify.Name = events.Name;
            if (events.Address != null || events.Address != "") toModify.Address = events.Address;
            if (events.Postcode != null || events.Postcode != "") toModify.Postcode = events.Postcode;
            if (events.Town != null || events.Town != "") toModify.Town = events.Town;
            if (events.EventDate != null) toModify.EventDate = events.EventDate;

            _dbcontext.SaveChanges();

            try
            {
                User = _dbcontext.User.Single(x => x.IdUser == toModify.UserId);
                var Event = new
                {
                    EventId = events.EventId,
                    Name = events.Name,
                    Address = events.Address,
                    Postcode = events.Postcode,
                    Town = events.Town,
                    User = User.Login,
                    EventDate = events.EventDate.ToString("dd-MM-yyy"),
                    EventHour = events.EventDate.ToString("HH:mm")

                };
                return Event;
            }
            catch (System.Exception)
            {
                var Event = new
                {
                    EventId = events.EventId,
                    Name = events.Name,
                    Address = events.Address,
                    Postcode = events.Postcode,
                    Town = events.Town,
                    User = "[deleted]",
                    EventDate = events.EventDate.ToString("dd-MM-yyy"),
                    EventHour = events.EventDate.ToString("HH:mm")

                };
                return Event;
            }
        }

        public dynamic DeleteEvent(int id)
        {
            Events toDelete = _dbcontext.Event.Single(e => e.EventId == id);
            if (toDelete != null)
            {
                _dbcontext.Event.Remove(toDelete);
                _dbcontext.SaveChanges();

                var Response = new
                {
                    Code = 0,
                    Type = "EventDelete",
                    Desc = "Success"
                };
                return Response;
            }
            else
            {
                var Response = new
                {
                    Code = 1,
                    Type = "EventDelete",
                    Desc = "Event deletion failed"
                };
                return Response;
            }
        }
    }
}

