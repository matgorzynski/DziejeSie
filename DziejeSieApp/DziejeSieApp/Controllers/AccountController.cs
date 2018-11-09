using EntityFramework.Models;
using Microsoft.AspNetCore.Mvc;
using EntityFramework.DBclass;

namespace DziejeSieApp.Controllers
{
    public class AccountController : Controller
    {


        [Route("user/login")]
        [HttpPost]

        public JsonResult LoginVerification([FromBody]Users user)
        {

            return Json(new Account().LoginVerification(user.Login, user.Password));
        }

        [Route("user/register")]
        [HttpPost]
        public ActionResult Register([FromBody]Users account)
        {
            if (ModelState.IsValid)
            {

                return Json(new Account().Register(account));
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
