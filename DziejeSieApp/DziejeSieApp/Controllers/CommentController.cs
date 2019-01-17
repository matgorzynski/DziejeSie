using EntityFramework.DataBaseContext;
using EntityFramework.DBclass;
using Microsoft.AspNetCore.Mvc;

namespace DziejeSieApp.Controllers
{
    public class CommentController : Controller
    {
        private readonly DziejeSieContext _dbcotext;

        public CommentController(DziejeSieContext dbcontext) { _dbcotext = dbcontext; }

        [Route("comments/add")]
        [HttpPost]
        public JsonResult AddComment([FromBody]Comment Comment)
        {
            string header = HttpContext.Request.Headers["VerySecureHeader"];
            if(header == "" || !LoggedIn)
        }
    }
}