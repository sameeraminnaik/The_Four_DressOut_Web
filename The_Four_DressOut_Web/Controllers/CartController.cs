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
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CartController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Cart
        [HttpGet ("getCart")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetCart()
        {
            var customerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var cartItems = await _context.CartItems
                .Include(c => c.Product)
                .Where(c => c.CustomerId == customerId)
                .Select(c => new
                {
                    c.Id,
                    c.Size,
                    c.Color,
                    c.Quantity,
                    Product = c.Product!.Name,
                    c.Product!.Price,
                    Total = c.Product!.Price * c.Quantity
                })
                .ToListAsync();

            var grandTotal = cartItems.Sum(c => c.Total);

            return Ok(new {cartItems, grandTotal });

        }

        // POST: api/Cart
        [HttpPost ("addToCart")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> AddToCart([FromBody] CartItemDTO dto)
        {
            var customerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var product = await _context.Products.FindAsync(dto.ProductId);
            if (product == null)
            {
                return NotFound("Product not found");
            }
            if(product.Stock < dto.Quantity)
            {
                return BadRequest($"Only {product.Stock} items in stock.");
            }

            var existing = await _context.CartItems.FirstOrDefaultAsync(
                c => c.CustomerId == customerId && 
                c.ProductId == dto.ProductId && 
                c.Size == dto.Size &&
                c.Color == dto.Color
                );

            if(existing != null)
            {
                if (existing.Quantity + dto.Quantity > product.Stock)
                    return BadRequest($"Only {product.Stock - existing.Quantity} more items available.");

                existing.Quantity += dto.Quantity;
            }
            else {
               var cartItem = new CartItem
                {
                    CustomerId = customerId,
                    ProductId = dto.ProductId,
                    Size = dto.Size,
                    Color = dto.Color,
                    Quantity = dto.Quantity
                };
                _context.CartItems.Add(cartItem);
            }
            await _context.SaveChangesAsync();
            return Ok("Item added to cart");
        }

        // Put: /api/Cart/id
        [HttpPut("{id}")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> UpdateQuantity(int id, [FromBody] CartItem dto)
        {
            var customerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var cartItem = await _context.CartItems.FirstOrDefaultAsync(c => c.Id == id && c.CustomerId == customerId);

            if (cartItem == null)
            {
                return NotFound("Cart item not found");
            }
            cartItem.Quantity = dto.Quantity;
            await _context.SaveChangesAsync();
            return Ok("Cart updated");
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            var customerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var cartItem = await _context.CartItems.FirstOrDefaultAsync(c=> c.Id == id && c.CustomerId == customerId);
            if (cartItem == null)
            {
                return NotFound("Cart item not found");
            }
            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();
            return Ok("Item removed from cart");
        }

        [HttpDelete]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> ClearCart()
        {
            var customerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var cartItems = await _context.CartItems.Where(c => c.CustomerId == customerId).ToListAsync();
            _context.CartItems.RemoveRange(cartItems);
            await _context.SaveChangesAsync();
            return Ok("Cart cleared");
        }
    }
}
