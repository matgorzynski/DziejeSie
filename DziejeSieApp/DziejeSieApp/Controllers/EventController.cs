using EntityFramework.Models;
using Microsoft.AspNetCore.Mvc;
using EntityFramework.DBclass;

namespace DziejeSieApp.Controllers
{
    public class EventController : Controller
    {
        
        [Route("event/all")]
        [HttpGet]
        public JsonResult AllEvent()
        {
            return Json(new Event().AllEvent());
        }

        //GET: dziejeSie.com/event/{id}
        [Route("event/{id}")]
        public JsonResult GetEventById(int id)
        {
            
            return Json(new Event().GetEventById(id));
        }

        //POST: dziejeSie.com/event
        [Route("event/add")]
        [HttpPost]
        public JsonResult AddNewEvent([FromBody]Events events)
        {
            if (ModelState.IsValid)
            {
                return Json(new Event().AddNewEvent(events));
            }
            else
            {
                var Stauts = new
                {
                    Status = "Failes"
                };
                return Json(Stauts);
            }
        }
        

        //PUT: dziejeSie.com/event/{x}
        [Route("event/modify/{id}")]
        [HttpPut]
        public JsonResult UpdateEvent(int id, [FromBody]Events events)
        {
            if (ModelState.IsValid)
            {
                return Json(new Event().UpdateEvent(id, events));
            }
            else
            {
            var Stauts = new
            {
                Status = "Failes"
            };
            return Json(Stauts);
        }
        }

        //DELETE: dziejeSie.com/Event/{x}
        [Route("event/delete/{id}")]
        [HttpDelete]
        public JsonResult DeleteEvent(int id)
        {
            return Json(new Event().DeleteEvent(id));
        }
    }
}
