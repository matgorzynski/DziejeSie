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
        public JsonResult LoginVerification([FromBody]Users user)
        {
            var result = new Account(_dbcontext).LoginVerification(user.Email, user.Password);

            
            var propertyInfo = result.GetType().GetProperty("Email");
            try
            {
                string usr = propertyInfo.GetValue(result, null);
                HttpContext.Session.SetString("User", usr); //tworzenie sesji -> login będzie odczytywane do wykonania większości akcji przez użytkownika
            }
            catch (System.Exception)
            {
                //użytkownik się nie zalogował -> sesja nie jest tworzona
            }
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
