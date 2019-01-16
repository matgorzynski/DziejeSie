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
            string header = HttpContext.Request.Headers["VerySecureHeader"];
            if (header == "" || !LoggedIn.Contains(header))
            {
                var Error = new
                {
                    Code = 3,
                    Type = "Upvote",
                    Desc = "User not logged in"
                };

                Response.StatusCode = 403; //Forbidden
                return Json(Error);
            }

            return Json(new Upvote(_dbcontext).Positive(UserId, EventId));
        }

        [Route("upvote/minus")]
        [HttpPost]
        public JsonResult Minus(int UserId, int EventId)
        {
            string header = HttpContext.Request.Headers["VerySecureHeader"];
            if (header == "" || !LoggedIn.Contains(header))
            {
                var Error = new
                {
                    Code = 3,
                    Type = "Upvote",
                    Desc = "User not logged in"
                };

                Response.StatusCode = 403; //Forbidden
                return Json(Error);
            }

            return Json(new Upvote(_dbcontext).Negative(UserId, EventId));
        }

        [Route("upvote/points")]
        [HttpPost]
        public JsonResult Points(int EventId)
        {
            return Json(new Upvote(_dbcontext).Points(EventId));
        }
    }
}