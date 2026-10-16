using Razorpay.Api;

namespace The_Four_DressOut_Web.Model
{
    public class RazorModelPayment
    {
        public string Id { get; set; } 
        public decimal Amount  { get; set; } 
        public string RazorpayOrderId { get; set; }
        public string RazorpayPaymentId { get; set; }
        public string Status { get; set; } = string.Empty;
        public string OrderId { get; set; } 
        public string CustomerId { get; set; } 
        public DateOnly CreatedAt { get; set; }
    }
}
