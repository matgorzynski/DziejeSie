using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EntityFramework.Models
{
    public class Comments
    {
        [Key]
        [Required]
        public int CommentId { get; set; }

        [Required]
        public DateTime AddDate { get; set; } = DateTime.Now;

        [Required]
        public string Body { get; set; }

        //[ForeignKey("UserId")]
        //public Users User { get; set; }
        [Required]
        public int UserId { get; set; }

        //[ForeignKey("EventId")]
        //public Events Event { get; set; }
        [Required]
        public int EventId { get; set; }
    }
}
