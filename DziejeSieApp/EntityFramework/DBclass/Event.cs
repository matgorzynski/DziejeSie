using EntityFramework.DataBaseContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using EntityFramework.Models;
using Microsoft.AspNetCore.Mvc;

namespace EntityFramework.DBclass
{
    public class Event
    {
        private readonly DziejeSieContext _dbcontext;
        public Event()
        {
            _dbcontext = new DziejeSieContext();
        }

        public string AllEvent()
        {

            return _dbcontext.Event.ToList().ToString();
        }

        
        public string GetEventById(int id)
        {
            Events Events = new Events();
            Events = _dbcontext.Event.Single(x => x.EventId == id);
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
            return Event.ToString();
        }


        public string AddNewEvent([FromBody]Events events)
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
            return Event.ToString();
        }

     
      
        public string UpdateEvent(int id, [FromBody]Events events)
        {
                Events toModify = _dbcontext.Event.Single(e => e.EventId == events.EventId);

                toModify.Name = events.Name;
                toModify.Address = events.Address;
                toModify.Postcode = events.Postcode;
                toModify.Town = events.Town;
                toModify.EventDate = events.EventDate;
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
            return Event.ToString();

            
        }
        
        public string DeleteEvent(int id)
        {
            Events toDelete = _dbcontext.Event.Single(e => e.EventId == id);
            if (toDelete != null)
            {
                _dbcontext.Event.Remove(toDelete);
                _dbcontext.SaveChanges();
                var Stauts = new
                {
                    Status = "Success"
                };
                return Stauts.ToString();
            }
            else
            {
                var Stauts = new
                {
                    Status = "Failed"
                };
                return Stauts.ToString();
            }
        }
    }
}

