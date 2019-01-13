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

        [Route("event/category/{category}")]
        [HttpGet]
        public JsonResult Category(string category)
        {
            return Json(new Event(_dbcontext).EventCategory(category));
        }


        [Route("event/town/{town}")]
        [HttpGet]
        public JsonResult Town(string town)
        {
            return Json(new Event(_dbcontext).EventTown(town));
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

                Response.StatusCode = 404; //Not Found
                return Json(Error);
            }
        }

        //POST: dziejeSie.com/event
        [Route("event/add")]
        [HttpPost]
        public JsonResult AddNewEvent([FromBody]Events events)
        {
            string header = HttpContext.Request.Headers["VerySecureHeader"];

            if (header == "")
            {
                var Error = new
                {
                    Code = 2,
                    Type = "EventAdd",
                    Desc = "User not logged in"
                };

                Response.StatusCode = 403; //Forbidden
                return Json(Error);
            }

            if (new Account(_dbcontext).CheckLogin(header))
            {
                if (ModelState.IsValid)
                {
                    events.UserId = (int)HttpContext.Session.GetInt32("UserId");
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

                    Response.StatusCode = 400; //Bad Request
                    return Json(Error);
                }
            }
            else
            {
                var Error = new
                {
                    Code = 2,
                    Type = "EventAdd",
                    Desc = "User not logged in"
                };

                Response.StatusCode = 403; //Forbidden
                return Json(Error);
            }
        }

        //PUT: dziejeSie.com/event/{x}
        [Route("event/modify/{id}")]
        [HttpPut]
        public JsonResult UpdateEvent(int id, [FromBody]Events events)
        {
            string header = HttpContext.Request.Headers["VerySecureHeader"];

            if (header == "")
            {
                var Error = new
                {
                    Code = 2,
                    Type = "EventAdd",
                    Desc = "User not logged in"
                };

                Response.StatusCode = 403; //Forbidden
                return Json(Error);
            }

            if (new Account(_dbcontext).CheckLogin(header))
            {
                if (ModelState.IsValid)
                {
                    if (new Event(_dbcontext).UserMatchesEvent(id, header))
                    {
                        return Json(new Event(_dbcontext).UpdateEvent(id, events));
                    }
                    else
                    {
                        var Error = new
                        {
                            Code = 3,
                            Type = "EventModify",
                            Desc = "This event does not belong to you"
                        };

                        Response.StatusCode = 403; //Forbidden
                        return Json(Error);
                    }
                }
                else
                {
                    var Error = new
                    {
                        Code = 1,
                        Type = "EventModify",
                        Desc = "Specified event body did not match event model in database"
                    };

                    Response.StatusCode = 400; //Bad Request
                    return Json(Error);
                }
            }
            else
            {
                var Error = new
                {
                    Code = 2,
                    Type = "EventModify",
                    Desc = "User not logged in"
                };

                Response.StatusCode = 403; //Forbidden
                return Json(Error);
            }
        }
        
        //DELETE: dziejeSie.com/Event/{x}
        [Route("event/delete/{id}")]
        [HttpDelete]
        public JsonResult DeleteEvent(int id)
        {
            string header = HttpContext.Request.Headers["VerySecureHeader"];

            if (header == "")
            {
                var Error = new
                {
                    Code = 2,
                    Type = "EventAdd",
                    Desc = "User not logged in"
                };

                Response.StatusCode = 403; //Forbidden
                return Json(Error);
            }

            if (new Account(_dbcontext).CheckLogin(header))
            {
                if (new Event(_dbcontext).UserMatchesEvent(id, header))
                {
                    return Json(new Event(_dbcontext).DeleteEvent(id));
                }
                else
                {
                    var Error = new
                    {
                        Code = 2,
                        Type = "EventDelete",
                        Desc = "This event does not belong to you"
                    };

                    Response.StatusCode = 403; //Forbidden
                    return Json(Error);
                }
            }
            else
            {
                var Error = new
                {
                    Code = 1,
                    Type = "EventDelete",
                    Desc = "User not logged in"
                };

                Response.StatusCode = 403; //Forbidden
                return Json(Error);
            }
        }
    }
}