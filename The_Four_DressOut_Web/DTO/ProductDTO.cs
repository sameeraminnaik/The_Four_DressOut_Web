using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using The_Four_DressOut_Web.Model;

namespace The_Four_DressOut_Web.DTO
{
    public class ProductDTO
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Range(1, 999999, ErrorMessage = "Price must be greater than 0")]
        public decimal Price { get; set; }

        [Required]
        [RegularExpression("^(XS|S|M|L|XL|XXL)$", ErrorMessage = "Size must be one of the following: XS, S, M, L, XL, XXL")]
        public string Size { get; set; } = string.Empty;

        [Required]
        public string Color { get; set; } = string.Empty;

        [Required]
        [Range(0, 10000)]
        public int Stock { get; set; }

        [Required]
        public int CategoryId { get; set; }
    }
}
