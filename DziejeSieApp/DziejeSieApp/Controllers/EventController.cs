using EntityFramework.Models;
using Microsoft.AspNetCore.Mvc;
using EntityFramework.DBclass;
using EntityFramework.DataBaseContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Cors;

namespace DziejeSieApp.Controllers
{
    [EnableCors("SiteCorsPolicy")]
    public class EventController : Controller
    {
        private readonly DziejeSieContext _dbcontext;

        public EventController(DziejeSieContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        [Route("event/all")]
        [HttpGet]
        public JsonResult AllEvent()
        {
            return Json(new Event(_dbcontext).AllEvent());
        }

        //GET: dziejeSie.com/event/{id}
        [Route("event/{id}")]
        public JsonResult GetEventById(int id)
        {
            if (id != 0)
            {
                return Json(new Event(_dbcontext).GetEventById(id));
            }
            else
            {
                var Error = new
                {
                    Code = 1,
                    Type = "GetSingleEvent",
                    Desc = "Invalid operation -> check route"
                };
                return Json(Error);
            }
        }

        //POST: dziejeSie.com/event
        [Route("event/add")]
        [HttpPost]
        public JsonResult AddNewEvent([FromBody]Events events)
        {
           
                if (ModelState.IsValid)
                {
                    events.AddDate = System.DateTime.Now;
                    return Json(new Event(_dbcontext).AddNewEvent(events));
                }
                else
                {
                    var Error = new
                    {
                        Code = 1,
                        Type = "EventAdd",
                        Desc = "Event could not be added"
                    };
                    return Json(Error);
                }
            }
           
        


        //PUT: dziejeSie.com/event/{x}
        [Route("event/modify/{id}")]
        [HttpPut]
        public JsonResult UpdateEvent(int id, [FromBody]Events events)
        {
            if (ModelState.IsValid)
            {
                return Json(new Event(_dbcontext).UpdateEvent(id, events));
            }
            else
            {
                var Error = new
                {
                    Code = 1,
                    Type = "EventModify",
                    Desc = "Specified event body did not match event model in database"
                };
                return Json(Error);
            }
        }



        //DELETE: dziejeSie.com/Event/{x}
        [Route("event/delete/{id}")]
        [HttpDelete]
        public JsonResult DeleteEvent(int id)
        {

            return Json(new Event(_dbcontext).DeleteEvent(id));
        }

    }
}