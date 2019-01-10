using EntityFramework.Models;
using Microsoft.AspNetCore.Mvc;
using EntityFramework.DBclass;
using EntityFramework.DataBaseContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Cors;

namespace DziejeSieApp.Controllers
{
    [EnableCors("SiteCorsPolicy")]
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
            string header = HttpContext.Request.Headers["VerySecureHeader"];

            if (header != "")
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
            string login = (string)type.GetProperty("Login").GetValue(result);

            if (LoggedIn.List.Exists(x => x.Contains(login)))
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

            HttpContext.Response.Headers["VerySecureHeader"] = login;
            LoggedIn.List.Add(login);

            return Json(result);
        }

        [Route("user/register")]
        [HttpPost]
        public ActionResult Register([FromBody]Users account)
        {
            string header = HttpContext.Request.Headers["VerySecureHeader"];

            if (header != "")
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
            string header = HttpContext.Request.Headers["VerySecureHeader"];

            if (header == "")
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
                LoggedIn.List.Remove(header);

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
