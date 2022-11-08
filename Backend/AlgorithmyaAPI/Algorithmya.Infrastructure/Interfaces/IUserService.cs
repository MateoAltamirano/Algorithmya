using Algorithmya.Core.Entities;
using System.Threading.Tasks;

namespace Algorithmya.Infrastructure.Interfaces
{
    public interface IUserService
    {
        User GetUser(string email);
        Task CreateUser(User user);
    }
}