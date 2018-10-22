using DziejeSieApp.DataBaseContext;
using DziejeSieApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

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

            if (CheckLogin(user) == true)
            {
                string savedPasswordHash = _dbcontext.User.Single(u => u.Login == user.Login).Password;
                if (user.VerifyUser(savedPasswordHash) == true)
                {

                    return Json(_dbcontext.User.Single(u => u.Login == user.Login));
                }
                else return Json("Login lub hasło jest niepoprawne");

            }
            else return Json("Wprowadzone dane są niepoprawne");
        }

        [Route("user/register")]
        [HttpPost]
        public ActionResult Register([FromBody]Users account)
        {
            if (ModelState.IsValid)
            {
                if (CheckRegistration(account) == true)
                {
                    account.PasswordHash();
                    _dbcontext.User.Add(account);
                    _dbcontext.SaveChanges();
                    SendMail sendMail = new SendMail();
                    string massege = "Witaj," + System.Environment.NewLine +
                        "Dziękujemy za rejestrację w Dzieje Sie," + System.Environment.NewLine+
                        "z nami będziesz zawsze na czasie z wydarzeniami w twojej okolicy" + System.Environment.NewLine +
                        "Pozdrawiamy" + System.Environment.NewLine +
                        "Dzieje Się";
                    sendMail.send("rejestracja@matgorzynski.hostingasp.pl",account.email,"Witaj w Dzieje Sie", massege,"zaq1@WSX");
                    ModelState.Clear();  

                    return Json("Dodalismy uzytkownika");
                }
                else return Json("Login już jest używany");

            }
            else
            {

                return Json("Wprowadzone dane są niepoprawne");
            }
        }



        public Boolean CheckRegistration(Users account)
        {
            if (_dbcontext.User.Any(u => u.Login == account.Login))
            {
                return false;
            }
            else return true;
        }



        public Boolean CheckLogin(Users account)
        {
            if (_dbcontext.User.Any(u => u.Login == account.Login))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
