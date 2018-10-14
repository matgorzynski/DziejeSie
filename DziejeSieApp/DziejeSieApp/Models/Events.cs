using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DziejeSieApp.Models
{
    public class Events
    {
        public int EventId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Postcode { get; set; }
        public string Town { get; set; }
        public DateTime EventDate { get; set; }
        public DateTime AddDate { get; set; }
        public Users User { get; set;}
    }
}