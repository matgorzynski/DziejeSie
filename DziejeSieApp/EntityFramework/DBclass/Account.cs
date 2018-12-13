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

        public Account(DziejeSieContext dbcontext)
        {
            _dbcontext = dbcontext;
        }


        public dynamic LoginVerification(string Login, string Password)
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
                    return User;
                }
                else
                {
                    Error Error = new Error(1, "Logowanie", "Złe dane wpisane");    //kod 1 oznacza błędne hasło
                    return Error;
                }
            }
            else
            {
                Error Error = new Error(2, "Logowanie", "Złe dane wpisane");    //kod 2 oznacza brak użytkowwnika o podanym loginie
                return Error;
            }
        }

        public dynamic Register([FromBody]Users account)
        {
            int wynik = CheckRegistration(account.Email, account.Login);
            if (wynik == 0)
            {
                account.PasswordHash();
                _dbcontext.User.Add(account);
                _dbcontext.SaveChanges();
                SendMail sendMail = new SendMail();
                string massege = "Witaj," + System.Environment.NewLine +
                    "Dziękujemy za rejestrację w DziejeSie," + System.Environment.NewLine +
                    "z nami będziesz zawsze na czasie z wydarzeniami w twojej okolicy" + System.Environment.NewLine +
                    "Pozdrawiamy" + System.Environment.NewLine +
                    "Zespół DziejeSie";
                sendMail.send("rejestracja@matgorzynski.hostingasp.pl", account.Email, "Witaj w DziejeSie", massege, "zaq1@WSX");


                var User = new
                {
                    Iduser = account.IdUser,
                    Login = account.Login,
                    Email = account.Email,
                    FirstName = account.Fisrtname,
                    LastName = account.LastName,
                    Address = account.Address,
                    PostCode = account.PostCode,
                    Town = account.Town,
                    RegisterDate = account.RegisterDate.ToString("dd-MM-yyy"),
                    RegisterHour = account.RegisterDate.ToString("HH:mm")

                };
                return User;

            }
            else if(wynik==1) 
            {
                var Error = new
                {
                    Kod = 1,
                    Typ = "Rejestracka",
                    Opis = "Podany email jest zajety"

                };
                return Error;

            }else
            {
                var Error = new
                {
                    Kod = 1,
                    Typ = "Rejestracka",
                    Opis = "Podany Login jest zajety"

                };
                return Error;

            }
        }

        public int CheckRegistration(string email, string Login)
        {
            if (_dbcontext.User.Any(u => u.Email == email))
            {
                return 1;
            }
            else if (_dbcontext.User.Any(u => u.Login == Login))
                {
                return 2;
            }
            return 0;
        }
        
        public Boolean CheckLogin(string email)
        {
            if (_dbcontext.User.Any(u => u.Email == email))
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
