using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EntityFramework.Models
{
    public class Upvotes
    {
        [Key]
        [Required]
        public int UpvoteId { get; set; }

        [Required]
        public int Value { get; set; } // 1 or -1

        [ForeignKey("UserId")]
        [Required]
        public Users User { get; set; }
        public int UserId { get; set; }

        [ForeignKey("EventId")]
        [Required]
        public Events Event { get; set; }
        public int EventId{ get; set; }
    }
}
