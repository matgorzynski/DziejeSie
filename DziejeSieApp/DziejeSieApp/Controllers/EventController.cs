using DziejeSieApp.DataBaseContext;
using DziejeSieApp.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace DziejeSieApp.Controllers
{
    //[Route("event")]
    public class EventController : Controller
    {
        private readonly DziejeSieContext _dbcontext;

        public EventController(DziejeSieContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        [Route("event/all")]
        public JsonResult AllEvent()
        {
            return Json(_dbcontext.Event.ToList());
        }
        
        //GET: dziejeSie.com/event/{id}
        [Route("event/{id}")]
        public JsonResult GetEventById(int id)
        {
            return Json(_dbcontext.Event.Where(x => x.EventId == id));
        }

        //POST: dziejeSie.com/event
        [Route("event/add")]
        [HttpPost]
        public JsonResult AddNewEvent([FromBody]Events events)
        {
            if (ModelState.IsValid)
            {
                _dbcontext.Event.Add(events);
                _dbcontext.SaveChanges();
                ModelState.Clear();
                return Json("Status: Success");
            }
            else
            {
                return Json("Status: Failed");
            }
        }

        //PUT: dziejeSie.com/event/{x}
        [Route("event/modify/{id}")]
        [HttpPut]
        public JsonResult UpdateEvent(int id, [FromBody]Events events)
        {
            if (ModelState.IsValid)
            {
                Events toModify = _dbcontext.Event.Single(e => e.EventId == events.EventId);

                toModify.Name = events.Name;
                toModify.Address = events.Address;
                toModify.Postcode = events.Postcode;
                toModify.Town = events.Town;
                toModify.EventDate = events.EventDate;
                
                _dbcontext.SaveChanges();
                ModelState.Clear();
                return Json("Status: Success");
            }
            else
            {
                return Json("Status: Failed");
            }
        }

        //DELETE: dziejeSie.com/Event/{x}
        [Route("event/delete/{id}")]
        [HttpDelete]
        public JsonResult DeleteEvent(int id)
        {
            Events toDelete = _dbcontext.Event.Single(e => e.EventId == id);
            if (toDelete != null)
            {
                _dbcontext.Event.Remove(toDelete);
                _dbcontext.SaveChanges();
                return Json("Status: Success");
            }
            else
            {
                return Json("Status: Failed");
            }
        }
    }
}
