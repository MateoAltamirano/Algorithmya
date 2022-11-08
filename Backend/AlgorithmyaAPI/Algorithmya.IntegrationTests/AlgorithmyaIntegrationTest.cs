using Algorithmya.Core.DTOs;
using Algorithmya.Infrastructure.Responses;
using AlgorithmyaAPI;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace Algorithmya.IntegrationTests
{
    public class AlgorithmyaIntegrationTest
    {
        protected readonly HttpClient _client;
        public AlgorithmyaIntegrationTest()
        {
            var appFactory = new WebApplicationFactory<Startup>();
            _client = appFactory.CreateClient();
        }

        protected async Task AuthenticateAsync(SignInDTO signIn)
        {
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", await GetJWTAsync(signIn));
        }

        private async Task<string> GetJWTAsync(SignInDTO signIn)
        {
            var response = await _client.PostAsJsonAsync("/api/Auth/", signIn);
            var registrationResponse = await response.Content.ReadFromJsonAsync<APIResponse<string>>();
            return registrationResponse.Data;
        }
    }
}
