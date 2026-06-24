using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using The_Four_DressOut_Web.Context;
using The_Four_DressOut_Web.DTO;
using The_Four_DressOut_Web.Model;

namespace The_Four_DressOut_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost ("register")]
        public async Task<IActionResult> Register(Register_DTO dto)
        {
            // Check if the email already exists
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            {
                return BadRequest("Email already exists.");
            }

            // Validate the role
            var allowedRoles = new[] {"Admin","Seller","Customer"};
            if (!allowedRoles.Contains(dto.Role))
            {
                return BadRequest("Invalid role. Allowed roles are: Admin, Seller, Customer.");
            }

            //Hash the password
            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = dto.Role,
                CreatedAt = DateTime.UtcNow
            };
            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return Ok("User registered successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {

            // Find the user by email
            var user = await _context.Users.FirstOrDefaultAsync(u=> u.Email == dto.Email);
            if(user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash)) {
                return Unauthorized("Invalid email or password.");
            }
            var token = GenerateJwtToken(user);
            return Ok(new
            {
                token,
                user.Role,
                name = user.FirstName + " " + user.LastName
            });
        }

        private string GenerateJwtToken(User user)  
        {
            // Create claims based on the user information
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Name, user.FirstName + " " + user.LastName),

            };

            // Generate a symmetric security key and signing credentials
            var Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Key"]!));
            var creds = new SigningCredentials(Key, SecurityAlgorithms.HmacSha256);

            // Create the JWT token with the specified claims, issuer, audience, and expiration
            var token = new JwtSecurityToken(
                issuer: _config["JwtSettings:Issuer"],
                audience : _config["JwtSettings:Audience"],
                claims: claims,
                expires : DateTime.UtcNow.AddDays(int.Parse(_config["JwtSettings:ExpiryInDays"]!)),
                signingCredentials: creds
                );

            // Return the serialized JWT token as a string
            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}
