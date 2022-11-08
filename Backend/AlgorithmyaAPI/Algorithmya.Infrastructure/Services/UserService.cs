using Algorithmya.Core.Entities;
using Algorithmya.Core.Exceptions;
using Algorithmya.Infrastructure.Interfaces;
using System;
using System.Threading.Tasks;

namespace Algorithmya.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public User GetUser(string email)
        {
            var user = _userRepository.GetUser(email);
            if (user == null)
            {
                throw new AlgorithmyaException(string.Format(AlgorithmyaExceptionMessages.NotFound, "User"), AlgorithmyaExceptionType.NotFound);
            }

            return user;
        }

        public async Task CreateUser(User user)
        {
            try
            {
                await _userRepository.CreateUser(user);
            }
            catch (Exception e)
            {
                var message = AlgorithmyaExceptionMessages.SomethingWentWrong;
                var type = AlgorithmyaExceptionType.InternalServerError;
                if (e.InnerException != null && e.InnerException.Message.Contains("23505"))
                {
                    message = AlgorithmyaExceptionMessages.DuplicateUser;
                    type = AlgorithmyaExceptionType.Conflict;
                }

                throw new AlgorithmyaException(message, type);
            }
        }
    }
}
