using DziejeSieApp.DataBaseContext;
using DziejeSieApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using Microsoft.AspNetCore.Cors;

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
                    user = _dbcontext.User.Single(u => u.Login == user.Login);
                    var User = new
                    {
                       Iduser = user.IdUser,
                        Login = user.Login,
                        Email=user.Email,
                        RegisterDate = user.RegisterDate.ToString("dd-MM-yyy"),
                        RegisterHour = user.RegisterDate.ToString("HH:mm")
                        
                    };
                    //tworzenie sesji dla użytkownika
                    HttpContext.Session.SetString("UserName", user.Login);
                    HttpContext.Session.SetInt32("UserID", user.IdUser);

                    return Json(User);
                }
                else
                {
                    Error Error = new Error(1, "Logowanie", "Złe dane wpisane");    //kod 1 oznacza błędne hasło
                    return Json(Error);
                }

            }
            else

            {

                Error Error = new Error(2, "Logowanie", "Złe dane wpisane");    //kod 2 oznacza brak użytkowwnika o podanym loginie
                return Json(Error);
            }
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
                        "Dziękujemy za rejestrację w Dzieje Sie," + System.Environment.NewLine +
                        "z nami będziesz zawsze na czasie z wydarzeniami w twojej okolicy" + System.Environment.NewLine +
                        "Pozdrawiamy" + System.Environment.NewLine +
                        "Dzieje Się";
                    sendMail.send("rejestracja@matgorzynski.hostingasp.pl", account.Email, "Witaj w Dzieje Sie", massege, "zaq1@WSX");
                    ModelState.Clear();

                    var User = new
                    {
                        Iduser = account.IdUser,
                        Login = account.Login,
                        Email = account.Email,
                        RegisterDate = account.RegisterDate.ToString("dd-MM-yyy"),
                        RegisterHour = account.RegisterDate.ToString("HH:mm")

                    };
                    return Json(User);
                }
                else
                {
                    Error Error = new Error(2, "Rejestracja", "Podany login jest zajęty");
                    return Json(Error);
                }

            }
            else
            {

                Error Error = new Error(3, "Rejestracja", "Dane wprowadzone są nieprawidłowe");
                return Json(Error);
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
