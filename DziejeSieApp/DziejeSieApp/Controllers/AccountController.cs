using EntityFramework.Models;
using Microsoft.AspNetCore.Mvc;
using EntityFramework.DBclass;
using EntityFramework.DataBaseContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Cors;

namespace DziejeSieApp.Controllers
{
    [DisableCors]
    public class AccountController : Controller
    {
        private readonly DziejeSieContext _dbcontext;

        public AccountController(DziejeSieContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        
        [Route("user/login")]
        [HttpPost]
        public ActionResult LoginVerification([FromBody]Users user)
        {
            if (HttpContext.Session.GetInt32("UserId") != null)
            {
                var Error = new
                {
                    Code = 1,
                    Type = "Login",
                    Desc = "User already logged in"
                };

                Response.StatusCode = 403;
                return Json(Error);
            }

            var result = (new Account(_dbcontext).LoginVerification(user.Login, user.Password));
           
            var type = result.GetType();
            int id = (int)type.GetProperty("Iduser").GetValue(result);

            HttpContext.Session.SetInt32("UserId", id);

            return Json(result);
        }

        [Route("user/register")]
        [HttpPost]
        public ActionResult Register([FromBody]Users account)
        {
            if (HttpContext.Session.GetInt32("UserId") != null)
            {
                var Error = new
                {
                    Code = 1,
                    Type = "Register",
                    Desc = "User already logged in"
                };

                Response.StatusCode = 403;
                return Json(Error);
            }

            if (ModelState.IsValid)
            {
                return Json(new Account(_dbcontext).Register(account));
            }
            else
            {
                return Json(BadRequest(ModelState));
            }
        }

        [Route("user/logout")]
        [HttpPost]
        public ActionResult Logout()
        {
            if (HttpContext.Session.GetInt32("UserId") == null)
            {
                var Error = new
                {
                    Code = 1,
                    Type = "Logout",
                    Desc = "User is not logged in"
                };

                Response.StatusCode = 403;
                return Json(Error);
            }
            else
            {
                HttpContext.Session.Remove("UserId");

                return Json(new
                {
                    Code = 0,
                    Type = "Logout",
                    Desc = "Success"
                });
            }
        }
    }
}
