using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using The_Four_DressOut_Web.Model;

namespace The_Four_DressOut_Web.DTO
{
    public class CartItemDTO
    {
        [Required]
        public int ProductId { get; set; }
        [Required]
        [RegularExpression("^(XS|S|M|L|XL|XXL)$", ErrorMessage = "Invalid Size")]
        public string Size { get; set; } = string.Empty;
        [Required]
        public string Color { get; set; } = string.Empty;
        [Required]
        [Range(1, 10000, ErrorMessage = "Quantity must be at least 1")]
        public int Quantity { get; set; }
        public string? Image { get; set; }
    }
}
