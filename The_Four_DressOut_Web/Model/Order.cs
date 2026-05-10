using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace The_Four_DressOut_Web.Model
{
    public class Order
    {
        
        public int Id { get; set; }
        public int CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        public User? Customer { get; set; }
        public DateTime OrderedAt { get; set; }
        public string Status { get; set; } = "Pending";
        public ICollection<CartItem> OrderItem { get; set; } = new List<CartItem>();
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
