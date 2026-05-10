using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using The_Four_DressOut_Web.Context;
using The_Four_DressOut_Web.Model;

namespace The_Four_DressOut_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CategoryController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Category
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _context.Categories.ToListAsync();
            return Ok(categories);
        }

        // GET: api/Category/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound("Category not found");
            }
            return Ok(category);
        }

        // POST: api/Category
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create ([FromBody] Category category)
        {
            if(string.IsNullOrEmpty(category.Name))
            {
                return BadRequest("Category name is required.");
            } 
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return Ok(category);
        }

        // PUT: api/Category/1
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update (int id, [FromBody] Category updated)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) 
            {
                return BadRequest("category cannot be null");
            }
            category.Name = updated.Name;
            await _context.SaveChangesAsync();
            return Ok(category);
        }

        // DELETE: api/Category/1
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete (int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound("Category not found");
            }
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return Ok("Category Deleted");
        }

    } 
}
