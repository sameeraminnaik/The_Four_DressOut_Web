using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using The_Four_DressOut_Web.Context;
using The_Four_DressOut_Web.DTO;
using The_Four_DressOut_Web.Model;

namespace The_Four_DressOut_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;
        public OrderController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PlaceOrder()
        {
            var customerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var cartItems = await _context.CartItems
                .Include(c => c.Product)
                .Where(c => c.CustomerId == customerId)
                .ToListAsync();

            if (!cartItems.Any())
            {
                return BadRequest("Your cart is empty.");
            }

            foreach (var item in cartItems)
            {
                if (item.Product!.Stock < item.Quantity)
                {
                    return BadRequest($"Not enough stock for {item.Product.Name}.");
                }
            }
            ;

            var order = new Order
            {
                CustomerId = customerId,
                OrderedAt = DateTime.UtcNow,
                Status = "Pending",
                OrderItems = cartItems.Select(c => new OrderItem
                {
                    ProductId = c.ProductId,
                    Size = c.Size,
                    Color = c.Color,
                    Quantity = c.Quantity,
                    PriceAtPurchase = c.Product!.Price
                }).ToList()
            };
            foreach (var item in cartItems)
            {
                item.Product!.Stock -= item.Quantity;
            }

            _context.Orders.Add(order);
            _context.CartItems.RemoveRange(cartItems);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Order placed successfully!", orderId = order.Id });
        }


        [HttpGet]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetMyOrders()
        {
            var customerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var orders = _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .Where(o => o.CustomerId == customerId)
                .Select(o => new
                {
                    o.Id,
                    o.Status,
                    o.OrderedAt,
                    Items = o.OrderItems.Select(oi => new
                    {
                        oi.Product!.Name,
                        oi.Size,
                        oi.Color,
                        oi.Quantity,
                        oi.PriceAtPurchase,
                        Total = oi.PriceAtPurchase * oi.Quantity
                    }),
                    TotalAmount = o.OrderItems.Sum(oi => oi.PriceAtPurchase * oi.Quantity)
                });
            return Ok(orders);
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .Select(o => new
                {
                    o.Id,
                    o.CustomerId,
                    o.Status,
                    o.OrderedAt,
                    Items = o.OrderItems.Select(oi => new
                    {
                        oi.Product!.Name,
                        oi.Size,
                        oi.Color,
                        oi.Quantity,
                        oi.PriceAtPurchase,
                        Total = oi.PriceAtPurchase * oi.Quantity
                    }),
                    TotalAmount = o.OrderItems.Sum(oi => oi.PriceAtPurchase * oi.Quantity)
                });

            return Ok(orders);
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "Seller,Admin")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateOrderStatusDTO dto)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound("Order not found.");
            }
            order.Status = dto.Status;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Order status updated successfully!" });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> CancelOrder(int id )
        {
            var customerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == id && o.CustomerId == customerId);
            if (order == null)
            {
                return NotFound("Order not found.");
            }

            if(order.Status != "Pending")
            {
                return BadRequest("Only pending orders can be cancelled.");
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return Ok("Order cancelled successfully!" );
        }
    }
}
