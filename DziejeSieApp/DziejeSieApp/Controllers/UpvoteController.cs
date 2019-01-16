using EntityFramework.DataBaseContext;
using Microsoft.AspNetCore.Mvc;
using EntityFramework.DBclass;

namespace DziejeSieApp.Controllers
{
    public class UpvoteController : Controller
    {
        private readonly DziejeSieContext _dbcontext;

        public UpvoteController(DziejeSieContext dbcontext) { _dbcontext = dbcontext; }

        [Route("upvote/plus")]
        [HttpPost]
        public JsonResult Plus(int UserId, int EventId)
        {
            //return Json(new Upvote(_dbcontext).Positive(UserId, EventId));
            
            string header = HttpContext.Request.Headers["VerySecureHeader"];
            if (header != "")
                if (LoggedIn.Contains(header))
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
    }
}