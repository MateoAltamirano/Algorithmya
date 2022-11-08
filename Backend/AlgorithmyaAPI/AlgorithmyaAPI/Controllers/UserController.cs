using Algorithmya.Core.DTOs;
using Algorithmya.Core.Entities;
using Algorithmya.Infrastructure.Interfaces;
using Algorithmya.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AlgorithmyaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IPasswordService _passwordService;

        public UserController(IUserService userService, IMapper mapper, IPasswordService passwordService)
        {
            _userService = userService;
            _mapper = mapper;
            _passwordService = passwordService;
        }

        /// <summary>
        /// Gets a specific user
        /// </summary>
        /// <param name="email"></param>
        /// <returns>The user with the specified email</returns>
        /// <response code="200">Returns the user with the specified email</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="404">If the user is not found</response>
        [HttpGet("{email}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetUser(string email)
        {
            var user = _userService.GetUser(email);
            var userDTO = _mapper.Map<UserDTO>(user);

            var response = new APIResponse<UserDTO>(userDTO, null);

            return Ok(response);
        }

        /// <summary>
        /// Creates a user
        /// </summary>
        /// <param name="signUpDTO"></param>
        /// <returns>A newly created user</returns>
        /// <response code="201">Returns the newly created user</response>
        /// <response code="400">If the sign up parameters are not valid</response>
        /// <response code="409">If the user has been already created</response>
        /// <response code="500">If the request failed to create a new user</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateUser(SignUpDTO signUpDTO)
        {
            var user = _mapper.Map<User>(signUpDTO);
            user.Password = _passwordService.Hash(user.Password);
            await _userService.CreateUser(user);
            var userDTO = _mapper.Map<UserDTO>(user);

            var response = new APIResponse<UserDTO>(userDTO, null);

            return Created(nameof(GetUser), response);
        }
    }
}
