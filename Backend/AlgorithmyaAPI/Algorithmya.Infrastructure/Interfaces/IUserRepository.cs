using Algorithmya.Core.Entities;
using System.Threading.Tasks;

namespace Algorithmya.Infrastructure.Interfaces
{
    public interface IUserRepository
    {
        User GetUser(string email);
        Task CreateUser (User user);
    }
}
