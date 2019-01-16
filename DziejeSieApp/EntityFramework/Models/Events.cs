using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EntityFramework.Models
{

    public class Events
    {
        [Key]
        [Required]
        public int EventId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string Postcode { get; set; }
        [Required]
        public string Town { get; set; }

        [Required]
        public string Category { get; set; } 
        
        [Required]
        public DateTime EventDate { get; set; }

        [Required]
        public string Description { get; set; }
        

        [Required]
        public DateTime AddDate { get; set; } = DateTime.Now;

        [ForeignKey("UserId")]
        public Users User { get; set; }
        public int UserId { get; set; }
    }
}