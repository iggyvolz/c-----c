using System;
using System.Collections.Generic;
using System.Linq;

namespace C_____CJS
{
    public class String : Data
    {
        public string Value { get; private set; }

        public String(string line)
        {
            if (line[0] != '"' || line[line.Length - 1] != '\'')
            {
                throw new ProgramException(ProgramException.SYNTAX_ERROR);
            }
            Value = line.Substring(1, line.Length - 2);
        }

        public override Data Asterisk(String other)
        {
            // Per specs: return string1
            return new String('"' + Value + '\'');
        }

        public override Data Asterisk(Int other)
        {
            // Per specs: string1 concatenated with string representation of int2
            return new String('"' + Value + other.ToString() + '\'');
        }

        public override Data Carrot(String other)
        {
            // Per specs: Characters of string2 and string1 alternated, until one string is depleted, then the rest of the non-depleted string
            List<char> result = new List<char>();
            // Begin string
            result.Add('"');
            for (int i = 0; i < Math.Max(Value.Length, other.ToString().Length); i++)
            {
                if (i < other.ToString().Length)
                {
                    result.Add(other.ToString()[i]);
                }
                if (i < Value.Length)
                {
                    result.Add(Value[i]);
                }
            }
            // End string
            result.Add('\'');
            return new String(new string(result.ToArray()));
        }

        public override Data Carrot(Int other)
        {
            // Per specs: last int2 characters of (string1 reversed)
            char[] charArray = Value.ToCharArray();
            charArray.Reverse();
            string reversedString = new string(charArray);
            return new String('"' + reversedString.Substring((int)(Value.Length-other.Value),(int)other.Value)+'\'');
        }

        public override Data Minus(String other)
        {
            // Per specs: Concatenation of string1 and string2
            return new String('"' + Value + other.ToString() + '\'');
        }

        public override Data Minus(Int other)
        {
            // Per specs: String representation of int2 concatenated with string1
            return new String('"' + other.ToString() + Value + '\'');
        }

        public override Data Percent(String other)
        {
            // Per specs: Characters of string1 and string2 alternated, until one string is depleted, then the rest of the non-depleted string
            List<char> result = new List<char>();
            // Begin string
            result.Add('"');
            for (int i = 0; i < Math.Max(Value.Length, other.ToString().Length); i++)
            {
                if (i < Value.Length)
                {
                    result.Add(Value[i]);
                }
                if (i < other.ToString().Length)
                {
                    result.Add(other.ToString()[i]);
                }
            }
            // End string
            result.Add('\'');
            return new String(new string(result.ToArray()));
        }

        public override Data Percent(Int other)
        {
            // Per specs: First int2 characters of string1
            return new String('"' + Value.Substring(0, (int)other.Value)+'\'');
        }

        public override Data Plus(String other)
        {
            // Per specs: string2
            return new String('"' + other.ToString() + '\'');
        }

        public override Data Plus(Int other)
        {
            // Per specs: Last int2 characters of string1
            return new String('"' + Value.Substring((int)(Value.Length - other.Value), (int)other.Value)+'\'');
        }

        public override Data Slash(String other)
        {
            // Per specs: Concatenation of string2 and string1
            return new String('"' + other.ToString() + Value + '\'');
        }

        public override Data Slash(Int other)
        {
            // Per specs: First int2 characters of (string1 reversed)
            char[] charArray = Value.ToCharArray();
            charArray.Reverse();
            return new String('"' + new string(charArray).Substring(0, (int)other.Value)+'\'');
        }

        public override string ToString()
        {
            return Value;
        }
    }
}