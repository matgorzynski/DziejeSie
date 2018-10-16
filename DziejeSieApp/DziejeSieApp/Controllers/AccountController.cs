using DziejeSieApp.DataBaseContext;
using DziejeSieApp.Models;
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

        [HttpPost]
        public JsonResult LoginVerification(Users user)
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

        [HttpPost]
        public ActionResult Register(Users account)
        {
            if (ModelState.IsValid)
            {
                if (CheckRegistration(account) == true)
                {
                    account.PasswordHash();
                    _dbcontext.User.Add(account);
                    _dbcontext.SaveChanges();
                    ModelState.Clear();  
                    return Ok();
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
