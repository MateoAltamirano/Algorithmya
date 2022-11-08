using Algorithmya.Core.DTOs;
using Algorithmya.Core.Entities;
using AutoMapper;

namespace Algorithmya.Infrastructure.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDTO>();
            CreateMap<UserDTO, User>();
            CreateMap<User, SignUpDTO>();
            CreateMap<SignUpDTO, User>();
        }
    }
}
