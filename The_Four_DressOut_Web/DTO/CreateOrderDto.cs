namespace The_Four_DressOut_Web.DTO
{
    public class CreateOrderDto
    {
        public int OrderId { get; set; }
    }
    public class VerifyPaymentDto {
        public string RazorpayOrderId { get; set; }
        public string RazorpayPaymentId { get; set; }
        public  string  RazorpaySignature { get; set; }
        public string OrderId { get; set; }
    }
}
