using System.Collections.Generic;

namespace Algorithmya.Infrastructure.Responses
{
    public class ErrorResponse
    {
        public string Type { get; set; }
        public IEnumerable<string> Details { get; set; }
    }
}
