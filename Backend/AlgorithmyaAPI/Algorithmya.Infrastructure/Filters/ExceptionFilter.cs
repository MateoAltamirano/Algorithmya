using Algorithmya.Core.Exceptions;
using Algorithmya.Infrastructure.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Algorithmya.Infrastructure.Filters
{
    public class ExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            if (context.Exception.GetType() == typeof(AlgorithmyaException))
            {
                var exception = (AlgorithmyaException) context.Exception;
                var error = new ErrorResponse
                {
                    Type = exception.Type.ToString(),
                    Details = new[] { exception.Message }
                };
                var response = new APIResponse<string>(null, error);

                context.Result = new ObjectResult(response);
                context.ExceptionHandled = true;
                switch (exception.Type)
                {
                    case AlgorithmyaExceptionType.BadRequest:
                        context.HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
                        break;
                    case AlgorithmyaExceptionType.Conflict:
                        context.HttpContext.Response.StatusCode = StatusCodes.Status409Conflict;
                        break;
                    case AlgorithmyaExceptionType.InternalServerError:
                        context.HttpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
                        break;
                    case AlgorithmyaExceptionType.NotFound:
                        context.HttpContext.Response.StatusCode = StatusCodes.Status404NotFound;
                        break;
                }
            }
        }
    }
}
