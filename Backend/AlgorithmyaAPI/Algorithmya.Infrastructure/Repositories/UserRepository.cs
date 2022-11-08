using Algorithmya.Core.Entities;
using Algorithmya.Infrastructure.Data;
using Algorithmya.Infrastructure.Interfaces;
using System.Linq;
using System.Threading.Tasks;

namespace Algorithmya.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AlgorithmyaContext _context;
        public UserRepository(AlgorithmyaContext context)
        {
            _context = context;
        }

        public User GetUser(string email)
        {
            var user = _context.Users.Where(user => user.Email == email).FirstOrDefault();
            return user;
        }

        public async Task CreateUser(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }
    }
}
