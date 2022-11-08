namespace Algorithmya.Infrastructure.Responses
{
    public class APIResponse<T>
    {
        public T Data { get; set; }
        public ErrorResponse Error { get; set; }
        public APIResponse(T data, ErrorResponse error)
        {
            Data = data;
            Error = error;
        }
    }
}
