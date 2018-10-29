using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DziejeSieApp.Models
{
    public class Error
    {
        [Key]
        public int ErrorCode { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string Desc { get; set; }

        public Error(int errorCode, string type, string desc)
        {
            ErrorCode = errorCode;
            Type = type;
            Desc = desc;
        }
    }
}
