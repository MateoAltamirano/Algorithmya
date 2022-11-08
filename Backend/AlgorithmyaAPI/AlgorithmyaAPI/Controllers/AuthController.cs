using Algorithmya.Core.DTOs;
using Algorithmya.Core.Entities;
using Algorithmya.Core.Exceptions;
using Algorithmya.Infrastructure.Interfaces;
using Algorithmya.Infrastructure.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AlgorithmyaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        private readonly IPasswordService _passwordService;

        public AuthController(IConfiguration configuration, IUserService userService, IPasswordService passwordService)
        {
            _configuration = configuration;
            _userService = userService;
            _passwordService = passwordService;
        }

        /// <summary>
        /// Authenticates a user
        /// </summary>
        /// <param name="signInDTO"></param>
        /// <returns>A JWT token</returns>
        /// <response code="200">Returns a success message</response>
        /// <response code="400">If the sign in parameters are not valid</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Authentication(SignInDTO signInDTO)
        {
            var validation = IsValidUser(signInDTO);
            if (!validation.Item1)
            {
                throw new AlgorithmyaException(AlgorithmyaExceptionMessages.InvalidCredentials, AlgorithmyaExceptionType.BadRequest);
            }
            var token = GenerateToken(validation.Item2);

            Response.Cookies.Append("X-Access-Token", token, new CookieOptions()
            { 
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                IsEssential = true,
                Secure = true
            });

            var response = new APIResponse<string>("success", null);

            return Ok(response);
        }

        private (bool, User) IsValidUser(SignInDTO signInDTO)
        {
            var user = _userService.GetUser(signInDTO.Email);
            var isValid = _passwordService.Check(user.Password, signInDTO.Password);
            return (isValid, user);
        }

        private string GenerateToken(User user)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Authentication:SecretKey"]));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            var header = new JwtHeader(signingCredentials);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
            };

            var payload = new JwtPayload
            (
                _configuration["Authentication:Issuer"],
                _configuration["Authentication:Audience"],
                claims,
                DateTime.Now,
                DateTime.UtcNow.AddHours(3)
            );

            var token = new JwtSecurityToken(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
