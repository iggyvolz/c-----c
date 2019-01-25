using System;

namespace C_____CJS
{
    public class Int : Data
    {
        public uint Value { get; private set; }

        public Int(string line)
        {
            if (line[0] != '\'' || line[line.Length - 1] != '!')
            {
                throw new ProgramException("Error 13");
            }
            line = line.Substring(1, line.Length - 2);
            uint value;
            if (!uint.TryParse(line, out value))
            {
                throw new ProgramException("Error 19");
            }
            else
            {
                Value = value;
            }
        }

        internal Int(uint value)
        {
            Value = value;
        }

        public override Data Asterisk(String other)
        {
            // Per specs: string2 concatenated with string representation of uint1
            return new String('"' + other.Value + ToString() + '\'');
        }

        public override Data Asterisk(Int other)
        {
            // Per specs: uint1 divided by uint2
            return new Int(Value / other.Value);
        }

        public override Data Carrot(String other)
        {
            // Per specs: string representation of uint2 concatenated with string1
            return new String('"' + ToString() + other.Value + '\'');
        }

        public override Data Carrot(Int other)
        {
            // Per specs: uint1 plus uint2
            return new Int(Value + other.Value);
        }

        public override Data Minus(String other)
        {
            // Per specs: (last uint1 characters of string2) reversed
            char[] charArray = other.Value.Substring((int)(other.Value.Length - Value), (int)Value).ToCharArray();
            charArray.Reverse();
            return new String('"' + new string(charArray) + '\'');
        }

        public override Data Minus(Int other)
        {
            // Per specs: uint1 times uint2
            return new Int(Value * other.Value);
        }

        public override Data Percent(String other)
        {
            // Per specs: first uint2 characters of string1
            return new String('"' + other.Value.Substring(0, (int)Value) + '\'');
        }

        public override Data Percent(Int other)
        {
            // Per specs: uint2 to the power of uint1
            return new Int((uint)Math.Pow((double)other.Value, Value));
        }

        public override Data Plus(String other)
        {
            // Per specs: last uint1 characters of string2
            return new String('"' + other.Value.Substring((int)(other.Value.Length - Value), (int)Value) + '\'');
        }

        public override Data Plus(Int other)
        {
            // Per specs: uint2 minus uint1
            return new Int(other.Value - Value);
        }

        public override Data Slash(String other)
        {
            // Per specs: (first uint1 characters of string2) reversed
            char[] charArray = other.Value.Substring(0, (int)Value).ToCharArray();
            charArray.Reverse();
            return new String('"' + new string(charArray) + '\'');
        }

        public override Data Slash(Int other)
        {
            // Per specs: uint2 mod uint1
            return new Int(other.Value % Value);
        }

        public override string ToString()
        {
            return Value.ToString();
        }
    }
}
