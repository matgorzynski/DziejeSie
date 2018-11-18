using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EntityFramework.Models
{
    public class Error
    {
        public int ErrorCode { get; set; }
        
        public string Type { get; set; }
        
        public string Desc { get; set; }

        public Error(int errorCode, string type, string desc)
        {
            ErrorCode = errorCode;
            Type = type;
            Desc = desc;
        }
    }
}
