using System.ComponentModel.DataAnnotations;

namespace The_Four_DressOut_Web.DTO
{
    public class OrderDTO
    {
        [Required]
        [RegularExpression("Pending|Shipped|Delivered|Cancelled", 
            ErrorMessage = "Invalid Status")]
        public string Status { get; set; } = string.Empty;
    }
}
