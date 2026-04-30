using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using The_Four_DressOut_Web.Model;

namespace The_Four_DressOut_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public IActionResult Login(string username, string password)
        {
            //if(!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(password))
            //{
            //    if(username == "admin" && password == "password")
            //    {
            //        return Ok("Login successful");
            //    }
            //    else
            //    {
            //        return Unauthorized("Invalid username or password");
            //    }
            //}
            //else
            //{
            //    return BadRequest("Username and password cannot be empty");
            //}
            return Ok("Login successful");
        }
    }
}
