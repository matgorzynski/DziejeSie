using EntityFramework.DataBaseContext;
using EntityFramework.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
namespace EntityFramework.DBclass
{
    public class Account
    {


        private readonly DziejeSieContext _dbcontext;
        public Account()
        {
            _dbcontext = new DziejeSieContext();

        }

        public string LoginVerification(string Login, string Password)
        {
            Users user = new Users();
            user.Login = Login;
            user.Password = Password;

            if (CheckLogin(user.Login) == true)
            {
                string savedPasswordHash = _dbcontext.User.Single(u => u.Login == user.Login).Password;
                if (user.VerifyUser(savedPasswordHash) == true)
                {
                    user = _dbcontext.User.Single(u => u.Login == user.Login);
                    var User = new
                    {
                        Iduser = user.IdUser,
                        Login = user.Login,
                        Email = user.Email,
                        RegisterDate = user.RegisterDate.ToString("dd-MM-yyy"),
                        RegisterHour = user.RegisterDate.ToString("HH:mm")

                    };
                    //tworzenie sesji dla użytkownika
                   // HttpContext.Session.SetString("UserName", user.Login);

                    return User.ToString();
                }
                else
                {
                    Error Error = new Error(1, "Logowanie", "Złe dane wpisane");    //kod 1 oznacza błędne hasło
                    return Error.ToString();
                }

            }
            else

            {

                Error Error = new Error(2, "Logowanie", "Złe dane wpisane");    //kod 2 oznacza brak użytkowwnika o podanym loginie
                return Error.ToString();
            }
        }


        public string Register([FromBody]Users account)
        {
            if (CheckRegistration(account.Login) == true)
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


                var User = new
                {
                    Iduser = account.IdUser,
                    Login = account.Login,
                    Email = account.Email,
                    RegisterDate = account.RegisterDate.ToString("dd-MM-yyy"),
                    RegisterHour = account.RegisterDate.ToString("HH:mm")

                };
                return User.ToString();
            }
            else
            {
                var Error = new
                {
                    Kod = 1,
                    Typ = "Rejestracka",
                    Opis = "POdany Login jest zajety"

                };
                return Error.ToString();

            }
        }

        public Boolean CheckRegistration(string Login)
        {
            if (_dbcontext.User.Any(u => u.Login == Login))
            {
                return false;
            }
            else return true;
        }



        public Boolean CheckLogin(string Login)
        {
            if (_dbcontext.User.Any(u => u.Login == Login))
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
