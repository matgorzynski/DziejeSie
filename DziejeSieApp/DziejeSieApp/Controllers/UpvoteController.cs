using EntityFramework.DataBaseContext;
using Microsoft.AspNetCore.Mvc;
using EntityFramework.DBclass;
using EntityFramework.Models;

namespace DziejeSieApp.Controllers
{
    public class UpvoteController : Controller
    {
        private readonly DziejeSieContext _dbcontext;

        public UpvoteController(DziejeSieContext dbcontext) { _dbcontext = dbcontext; }

        [Route("upvote/plus")]
        [HttpPost]
        public JsonResult Plus([FromBody]Upvotes Upvotes)
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

            return Json(new Upvote(_dbcontext).Positive(Upvotes.UserId, Upvotes.EventId));
        }

        [Route("upvote/minus")]
        [HttpPost]
        public JsonResult Minus([FromBody]Upvotes Upvotes)
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

            return Json(new Upvote(_dbcontext).Negative(Upvotes.UserId, Upvotes.EventId));
        }

        [Route("upvote/points")]
        [HttpPost]
        public JsonResult Points([FromBody]Upvotes Upvotes)
        {
            return Json(new Upvote(_dbcontext).Points(Upvotes.EventId));
        }
    }
}