using EntityFramework.Models;
using Microsoft.AspNetCore.Mvc;
using EntityFramework.DBclass;
using EntityFramework.DataBaseContext;
using Microsoft.AspNetCore.Http;

namespace DziejeSieApp.Controllers
{
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
            var result = new Account(_dbcontext).LoginVerification(user.Login, user.Password);
            
            var propertyInfo = result.GetType().GetProperty("Iduser");
            try
            {
                string usr = propertyInfo.GetValue(result, null);
                HttpContext.Session.SetString("User", usr); //tworzenie sesji -> id będzie odczytywane do wykonania większości akcji przez użytkownika
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
                var Error = new
                {
                    Kod = 1,
                    Typ = "Rejestracja",
                    Opis = "Wrpowadzona dane są błędne."
                };
                return Json(Error);
            }
        }
    }
}
