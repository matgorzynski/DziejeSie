using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DziejeSieApp.Models
{
    public class Users
    {
        [Key]
        [Required]
        public int IdUser { get; set; }

        [Required]
        [MinLength(10)]
        public string Login { get; set; }
    }
}