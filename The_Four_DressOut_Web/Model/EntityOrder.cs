namespace RazorpayApi.Models
{
    public class EntityOrder
    {
        public string Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string TransactionId { get; set; }
        public string OrderId { get; set; }
    }
}
