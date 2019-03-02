using EntityFramework.DataBaseContext;
using EntityFramework.DBclass;
using EntityFramework.Models;
using Microsoft.AspNetCore.Mvc;

namespace DziejeSieApp.Controllers
{
    public class CommentController : Controller
    {
        private readonly DziejeSieContext _dbcotext;

        public CommentController(DziejeSieContext dbcontext) { _dbcotext = dbcontext; }

        [Route("comments/add")]
        [HttpPost]
        public JsonResult AddComment([FromBody]Comments Comment)
        {
            string header = HttpContext.Request.Headers["VerySecureHeader"];
            if(header == "" || !LoggedIn.Contains(header))
            {
                var Error = new
                {
                    Code = 4,
                    Type = "Comment",
                    Desc = "User not logged in"
                };

                Response.StatusCode = 403; //Forbidden
                return Json(Error);
            }
            return Json(new Comment(_dbcotext).AddComment(Comment));
        }

        [Route("comments/modify/{id}")]
        [HttpPut]
        public JsonResult ModifyComment(int id, [FromBody]Comments comment)
        {
            string header = HttpContext.Request.Headers["VerySecureHeader"];
            if (header == "" || !LoggedIn.Contains(header))
            {
                var Error = new
                {
                    Code = 4,
                    Type = "Comment",
                    Desc = "User not logged in"
                };

                Response.StatusCode = 403; //Forbidden
                return Json(Error);
            }
            return Json(new Comment(_dbcotext).ModifyComment(id, comment));
        }

        [Route("comments/delete/{id}")]
        [HttpDelete]
        public JsonResult DeleteEvent(int id)
        {
            string header = HttpContext.Request.Headers["VerySecureHeader"];
            if (header == "" || !LoggedIn.Contains(header))
            {
                var Error = new
                {
                    Code = 4,
                    Type = "Comment",
                    Desc = "User not logged in"
                };

                Response.StatusCode = 403; //Forbidden
                return Json(Error);
            }
            return Json(new Comment(_dbcotext).DeleteComment(id));
        }

        [Route("comments/get/{id}")]
        [HttpGet]
        public JsonResult GetSingleComment(int id)
        {
            return Json(new Comment(_dbcotext).GetComment(id));
        }

        [Route("comments/get/event/{id}")]
        [HttpGet]
        public JsonResult GetCommentsForEvent(int id)
        {
            return Json(new Comment(_dbcotext).GetCommentsForEvent(id));
        }

        [Route("comments/get/user/{id}")]
        [HttpGet]
        public JsonResult GetCommentsForUser(int id)
        {
            return Json(new Comment(_dbcotext).GetCommentsForUser(id));
        }
    }
}