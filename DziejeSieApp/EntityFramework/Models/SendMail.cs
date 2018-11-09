using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace EntityFramework.Models
{
    public class SendMail
    {
        public void send(string sentfrom, string sentto, string title, string body, string password )
        {
            var message = new MailMessage();
            message.From = new MailAddress(sentfrom, "Dzieje sie");
            message.To.Add(new MailAddress(sentto));
            message.Subject = title;
            message.Body = body;
            var smtp = new SmtpClient("smtp.webio.pl");
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential(sentfrom, password);
            smtp.EnableSsl = true;
            smtp.Port = 587; //musi byc bo na 465 crashuje
            smtp.Send(message);
        }
    }
}
