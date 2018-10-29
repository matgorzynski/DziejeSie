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

                    return Json(_dbcontext.User.Single(u => u.Login == user.Login));
                }
                else
                {
                    Error Error = new Error(1, "Logowanie", "Złe dane wpisane");
                    return Json(Error);
                }

            }
            else

            {

                Error Error = new Error(1, "Logowanie", "Złe dane wpisane");
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
                    sendMail.send("rejestracja@matgorzynski.hostingasp.pl", account.email, "Witaj w Dzieje Sie", massege, "zaq1@WSX");
                    ModelState.Clear();

                    //var result = new { account.Login, account.email, account.RegisterDate, account.IdUser, account.RegisterHour };
                    return Json(_dbcontext.User.Single(u => u.Login == account.Login));
                }
                else
                {
                    Error Error = new Error(2, "Rejestracja", "POdany login jest zajęty");
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
