using Algorithmya.Core.DTOs;
using FluentValidation;

namespace Algorithmya.Infrastructure.Validators
{
    public class SignUpValidator : AbstractValidator<SignUpDTO>
    {
        public SignUpValidator()
        {
            RuleFor(user => user.Email).NotNull().EmailAddress().Length(6, 320);
            RuleFor(user => user.Name).NotNull().Length(1, 100);
            RuleFor(user => user.Password).NotNull().Length(8, 128);
        }
    }
}
