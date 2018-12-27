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
            var result = (new Account(_dbcontext).LoginVerification(user.Login, user.Password));

            //public void Create(object obj)
            //{
            //    var type = obj.GetType();
            //    int code = (int)type.GetProperty("Code").GetValue(obj);
            //    string name = (string)type.GetProperty("ProductName").GetValue(obj);
            //}

            var type = result.GetType();
            //if (type == "Error")
            //{
            //    return Json(result);
            //}
            //else
            string name = (string)type.GetProperty("Login").GetValue(result);
            HttpContext.Session.SetString("UserName", name);

            return Json(result);
        }

        [Route("user/register")]
        [HttpPost]
        public ActionResult Register([FromBody]Users account)
        {
            if (ModelState.IsValid)
            {
                return Json(new Account(_dbcontext).Register(account));
            }
            else
            {
                return Json(BadRequest(ModelState));
            }
        }
    }
}
