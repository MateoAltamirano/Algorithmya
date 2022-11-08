using System;

namespace Algorithmya.Core.Exceptions
{
    public class AlgorithmyaException : Exception
    {
        public AlgorithmyaExceptionType Type { get; set; }
        public AlgorithmyaException(string message, AlgorithmyaExceptionType type) : base(message)
        {
            Type = type;
        }
    }
}
