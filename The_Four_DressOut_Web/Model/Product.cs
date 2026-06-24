
using System.ComponentModel.DataAnnotations.Schema;

namespace The_Four_DressOut_Web.Model
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Size { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public int Stock { get; set; }
        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }
        public string? Image { get; set; }
        public int SellerId { get; set; }
        [ForeignKey("SellerId")]
        public User? Seller { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
