using System.ComponentModel.DataAnnotations;

namespace The_Four_DressOut_Web.DTO
{
    public class LoginDTO
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
        public string? Password { get; set; }
    }

    public class Register_DTO
    {
        [Required]
        [MaxLength(20, ErrorMessage = "First name cannot exceed 20 characters.")]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [MaxLength(20, ErrorMessage = "Last name cannot exceed 20 characters.")]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$")]
        public string Password { get; set; } = string.Empty;

        [Required]
        [Compare("Password", ErrorMessage = "Passwords do not match.")]
        public string ConfirmPassword { get; set; } = string.Empty;

        public string Role { get; set; } = string.Empty;
    }
}
