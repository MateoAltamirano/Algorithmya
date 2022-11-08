using Algorithmya.Core.DTOs;
using System.Net;
using System.Net.Http.Json;
using Xunit;

namespace Algorithmya.IntegrationTests
{
    public class UserControllerTests : AlgorithmyaIntegrationTest
    {
        [Fact]
        public async void GetUser_Returns401Unauthorized()
        {
            //Arrange
            var email = "test@gmail.com";

            //Act
            var response = await _client.GetAsync($"api/User/{email}");

            //Assert
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async void GetUser_Returns404NotFound()
        {
            //Arrange
            var email = "test@gmail.com";
            var signInDTO = new SignInDTO { Email = email, Password = "12345678" };
            await AuthenticateAsync(signInDTO);
            email = "t@gmail.com";

            //Act
            var response = await _client.GetAsync($"api/User/{email}");

            //Assert
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async void GetUser_Returns200Ok()
        {
            //Arrange
            var email = "test@gmail.com";
            var signInDTO = new SignInDTO { Email = email, Password = "12345678" };
            await AuthenticateAsync(signInDTO);

            //Act
            var response = await _client.GetAsync($"api/User/{email}");

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }


        [Fact]
        public async void CreateUser_Returns400BadRequest()
        {
            //Arrange
            var signUpDTO = new SignUpDTO { Email = "test", Password = "12345678", Name = "Test" };

            //Act
            var response = await _client.PostAsJsonAsync($"api/User", signUpDTO);

            //Assert
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async void CreateUser_Returns409Conflict()
        {
            //Arrange
            var signUpDTO = new SignUpDTO { Email = "test@gmail.com", Password = "12345678", Name = "Test" };

            //Act
            var response = await _client.PostAsJsonAsync($"api/User", signUpDTO);

            //Assert
            Assert.Equal(HttpStatusCode.Conflict, response.StatusCode);
        }
    }
}
