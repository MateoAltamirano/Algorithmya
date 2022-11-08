using Algorithmya.Core.DTOs;
using Algorithmya.Core.Entities;
using Algorithmya.Core.Exceptions;
using Algorithmya.Infrastructure.Interfaces;
using Algorithmya.Infrastructure.Mappings;
using Algorithmya.Infrastructure.Services;
using AutoMapper;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace Algorithmya.UnitTests
{
    public class UserServiceTests
    {
        private readonly IUserService _userService;
        private readonly Mock<IUserRepository> _mockRepository;
        private readonly IMapper _mapper;

        public UserServiceTests()
        {
            _mockRepository = new Mock<IUserRepository>();
            _mapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            }).CreateMapper();
            _userService = new UserService(_mockRepository.Object);
        }

        [Fact]
        public void GetUser_ReturnsUser()
        {
            //Arrange
            var email = "test@gmail.com";
            var user = new User { Id = 1, Name = "Test", Email = email, Password = "12345678" };
            _mockRepository.Setup(x => x.GetUser(email)).Returns(user);

            //Act
            var result = _userService.GetUser(email);

            //Assert
            Assert.Equal(result, user);
        }

        [Fact]
        public void GetUser_ThrowsAlgorithmyaException()
        {
            //Arrange
            var email = "test@gmail.com";
            User user = null;
            _mockRepository.Setup(x => x.GetUser(email)).Returns(user);

            //Act
            void result() => _userService.GetUser(email);

            //Assert
            Assert.Throws<AlgorithmyaException>(result);
        }

        [Fact]
        public void CreateUser_CreatesNewUser()
        {
            //Arrange
            var signUpDTO = new SignUpDTO { Name = "Test", Email = "test@gmail.com", Password = "12345678" };
            var user = _mapper.Map<User>(signUpDTO);
            _mockRepository.Setup(x => x.CreateUser(user)).Returns(Task.FromResult(user));

            //Act
            var ex = Record.ExceptionAsync(async () => await _userService.CreateUser(user));
            
            //Assert
            Assert.Null(ex.Result);
        }

        [Fact]
        public async void CreateUser_ThrowsAlgorithmyaException()
        {
            //Arrange
            var signUpDTO = new SignUpDTO { Name = "Test", Email = "test@gmail.com", Password = "12345678" };
            var user = _mapper.Map<User>(signUpDTO);
            _mockRepository.Setup(x => x.CreateUser(user)).ThrowsAsync(new Exception());

            //Act
            Task result() => _userService.CreateUser(user);

            //Assert
            await Assert.ThrowsAsync<AlgorithmyaException>(result);
        }
    }
}
