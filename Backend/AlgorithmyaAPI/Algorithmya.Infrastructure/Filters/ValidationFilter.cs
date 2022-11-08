using Algorithmya.Core.Exceptions;
using Algorithmya.Infrastructure.Responses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;
using System.Threading.Tasks;

namespace Algorithmya.Infrastructure.Filters
{
    public class ValidationFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (!context.ModelState.IsValid)
            {
                var error = new ErrorResponse
                {
                    Type = AlgorithmyaExceptionType.BadRequest.ToString(),
                    Details = context.ModelState.Values.Select(value => value.Errors.FirstOrDefault().ErrorMessage)
                };
                var response = new APIResponse<string>(null, error);
                context.Result = new BadRequestObjectResult(response);

                return;
            }
            await next();
        }
    }
}
