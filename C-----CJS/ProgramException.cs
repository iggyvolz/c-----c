using System;

namespace C_____CJS
{
    public class ProgramException : Exception
    {
        //public const string SYNTAX_ERROR = "( ͡° ͜ʖ ͡°)";
        //public const string OPERATION_ERROR = "( ͡° ͜ʖ ͡°)";
        public const string SYNTAX_ERROR = "¯\\_(ツ)_/¯";
        public const string OPERATION_ERROR = "¯\\_(ツ)_/¯";
        public const string DID_BAD = "¯\\_(ツ)_/¯";
        public const string SEGFAULT = "Segmentation Fault";
        public ProgramException(string message) : base(message) { }
    }
}