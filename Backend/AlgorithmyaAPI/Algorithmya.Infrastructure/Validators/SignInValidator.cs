using Algorithmya.Core.DTOs;
using FluentValidation;

namespace Algorithmya.Infrastructure.Validators
{
    public class SignInValidator : AbstractValidator<SignInDTO>
    {
        public SignInValidator()
        {
            RuleFor(user => user.Email).NotNull().EmailAddress().Length(6, 320);
        }
    }
}
