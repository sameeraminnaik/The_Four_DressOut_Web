using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
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
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }


        
        // GET api/product — Anyone can view
        [HttpGet ("getAllProduct")]
        public async Task<IActionResult> GetAll(
            [FromQuery] string? category,
            [FromQuery] string? size,
            [FromQuery] string? color,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] string? search)
        {
            var query = _context.Products
                .Include(p => p.Category)
                .Include(p => p.Seller)
                .AsQueryable();

            // Filters
            if (!string.IsNullOrEmpty(category))
                query = query.Where(p => p.Category!.Name == category);

            if (!string.IsNullOrEmpty(size))
                query = query.Where(p => p.Size == size);

            if (!string.IsNullOrEmpty(color))
                query = query.Where(p => p.Color == color);

            if (minPrice.HasValue)
                query = query.Where(p => p.Price >= minPrice.Value);

            if (maxPrice.HasValue)
                query = query.Where(p => p.Price <= maxPrice.Value);

            if (!string.IsNullOrEmpty(search))
                query = query.Where(p => p.Name.Contains(search));

            var products = await query.Select(p => new
            {
                p.Id,
                p.Name,
                p.Description,
                p.Price,
                p.Size,
                p.Color,
                p.Stock,
                p.Image,
                p.CreatedAt,
                Category = p.Category!.Name,
                Seller = p.Seller!.FirstName + " " + p.Seller.LastName
            }).ToListAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Seller)
                .FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
            {
                return NotFound("Product not found");
            }
            return Ok(product);

        }

        [HttpPost("addpost")]
        [Authorize(Roles = "Seller")]
        public async Task<IActionResult> Create([FromForm] ProductDTO dto)
        {
            var sellerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var category = await _context.Categories.FindAsync(dto.CategoryId);

            string? imagePath = null;

            if (dto.Image != null)
            {
                var uploadsFolder = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot/images/products");

                Directory.CreateDirectory(uploadsFolder);

                var fileName = Guid.NewGuid() + Path.GetExtension(dto.Image.FileName);

                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Image.CopyToAsync(stream);
                }

                imagePath = "/images/products/" + fileName;
                Console.WriteLine(Directory.GetCurrentDirectory());
                Console.WriteLine(filePath);
            }


            if (category == null)
                return BadRequest("Invalid category.");

            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                Size = dto.Size,
                Color = dto.Color,
                Stock = dto.Stock,
                CategoryId = dto.CategoryId,
                Image = imagePath,
                SellerId = sellerId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Seller")]
        public async Task<IActionResult> Update(int id, [FromBody] Product dto)
        {
            var sellerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var product = await _context.Products.FindAsync(id);
            if(product == null)
            {
                return NotFound("Product not found");
            }
            if (product.SellerId != sellerId)
            {
                return Forbid();
            }
            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Price = dto.Price;
            product.Size = dto.Size;
            product.Color = dto.Color;
            product.Stock = dto.Stock;
            product.CategoryId = dto.CategoryId;

            await _context.SaveChangesAsync();
            return Ok(product);
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Seller")]
        public async Task<IActionResult> Delete(int id)
        {
            var sellerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var product = await _context.Products.FindAsync(id);
            if(product == null)
            {
                return NotFound("Product not found");
            }
            if (product.SellerId != sellerId)
            {
                return Forbid();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }
    }
}