using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Razorpay.Api;
using RazorpayApi.Models;
using System.Security.Claims;
using The_Four_DressOut_Web.Context;
using The_Four_DressOut_Web.DTO;
using The_Four_DressOut_Web.Model;

namespace The_Four_DressOut_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RazorApiPaymentController : ControllerBase
    {
        private readonly AppDbContext _context;
        public IConfiguration _iconfig;

        public RazorApiPaymentController(IConfiguration iconfig, AppDbContext context)
        {
            _iconfig = iconfig;
            _context = context;
        }
        

        [HttpPost ("create-order")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto dto)
        {

            var appOrder = await _context.Orders.FirstOrDefaultAsync(o => o.Id == dto.OrderId);
            if (appOrder == null) { 
                return NotFound("Order not found");
            }

            var userId = User.FindFirst("id")?.Value // adjust claim type to match your JWT
                    ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ;

            if (appOrder.Id.ToString() != userId)
            {
                return Forbid();
            }

            decimal amount = appOrder.TotalAmount; // server-computed, trusted value

            var client = new RazorpayClient(_iconfig["RazorpayKey"], _iconfig["RazorpaySecret"]);

            var options = new Dictionary<string, object>
            {
                {"amount" , (amount*100).ToString() },
                {"currency" , "INR"},
                {"receipt" , $"order_rcpt_{appOrder.Id}_{Guid.NewGuid():N}"}
            };


            Razorpay.Api.Order order = client.Order.Create(options);

            var payment = new RazorModelPayment
            {
                OrderId = appOrder.Id.ToString(),
                RazorpayOrderId = order["id"].ToString(),
                Amount = amount,
                CustomerId = userId,
                Status = "Pending"
            };

            _context.PaymentItems.Add(payment);
            await _context.SaveChangesAsync();


            return Ok(new
            {
                key = _iconfig["Razorpay:Key"],
                orderId = order["id"].ToString(),
                amount = amount * 100,
                currency = "INR"
            });

        }


        [HttpPost("verify-payment")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> VerifyPayment([FromBody] VerifyPaymentDto dto)
        {
            var payment = await _context.PaymentItems
                .FirstOrDefaultAsync(p => p.RazorpayOrderId == dto.RazorpayOrderId
                                        && p.OrderId == dto.OrderId);

            if (payment == null)
                return NotFound("Payment record not found");

            var attributes = new Dictionary<string, string>
        {
            { "razorpay_order_id", dto.RazorpayOrderId },
            { "razorpay_payment_id", dto.RazorpayPaymentId },
            { "razorpay_signature", dto.RazorpaySignature }
        };

            try
            {
                // Throws Razorpay.Api.Errors.SignatureVerificationError on failure
                Razorpay.Api.Utils.verifyPaymentSignature(attributes);

                payment.Status = "Paid";
                payment.RazorpayPaymentId = dto.RazorpayPaymentId;

                var appOrder = await _context.Orders.FindAsync(dto.OrderId);
                if (appOrder != null)
                    appOrder.Status = "Your order is confirmed"; // adjust to your Order status enum

                await _context.SaveChangesAsync();
                return Ok(new { status = "success" });
            }
            catch (Exception)
            {
                payment.Status = "Failed";
                await _context.SaveChangesAsync();
                return BadRequest(new { status = "failed", message = "Signature verification failed" });
            }
        }
    }
}

