using Bridge;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace C_____CJS
{
    public class Compiler
    {
        public string Return
        {
            get
            {
                // Validate script
                if(enableValidation)
                {
                    char[] hash = GetSha256(string.Join("\n", lines)).ToCharArray();
                    char[] targetHash = GetSha256("C-----C").ToCharArray();
                    // Get number of elements in common between hash and targetHash
                    int numCharsInCommon = 0;
                    for(int i=0;i<hash.Length;i++)
                    {
                        if(hash[i] == targetHash[i])
                        {
                            numCharsInCommon++;
                        }
                    }
                    if(IsPrime(numCharsInCommon))
                    {
                        throw new ProgramException(ProgramException.SEGFAULT);
                    }
                }
                return GetMemory(currentLine).ToString();
            }
        }

        private string GetSha256(string str)
        {
            return Script.Write<string>("sha256(str);");
        }

        private bool enableValidation;
        public Compiler(bool enableValidation)
        {
            this.enableValidation = enableValidation;
        }
        public static bool IsPrime(int i)
        {
            if (i < 2) return false;
            // Algorithm from http://stackoverflow.com/a/21176886
            return Enumerable.Range(1, i).Where(x => i % x == 0).SequenceEqual(new[] { 1, i });
        }
        public static bool IsPrime(uint i)
        {
            return IsPrime((int)i);
        }
        
        private Dictionary<uint, Data> memory = new Dictionary<uint, Data>();
        private Data GetMemory(uint val)
        {
            if(memory.ContainsKey(val))
            {
                return memory[val];
            }
            // Else return the line number that we are trying to grab
            return new Int(val);
        }
        private uint currentLine = 0;
        private List<string> lines = new List<string>();
        public void Line(string line)
        {
            Line(line, false);
        }
        private void Line(string line, bool repeat)
        {
            uint previousLine = currentLine; ;
            if(!repeat)
            {
                lines.Add(line);
            }
            // Skip until we get a non-prime that is greater than four
            do
            {
                currentLine++;
            } while (currentLine < 4 || IsPrime(currentLine));
            // We'll never have two non-lines in a row, since no two primes appear consecutively (except less than 4)
            // Check if the line is a data entry line or an operation line
            if (line[0] == '\'')
            {
                memory[currentLine] = new Int(line);
            }
            else if(line[0] == '"')
            {
                memory[currentLine] = new String(line);
            }
            else if(line == ProgramException.SYNTAX_ERROR)
            {
                // Check whether the last valid line is set to itself
                if(GetMemory(previousLine) is Int)
                if(((Int)GetMemory(previousLine)).Value == previousLine)
                {
                    // Loop back to beginning and run all lines of code
                    currentLine = 0; ;
                    for(int i=0;i<lines.Count;i++)
                    {
                        Line(lines[i], true);
                    }
                }
            }
            else
            {
                // Operation line
                Regex reg = new Regex("([0-9]+)([-+*/^% ])([0-9]+)"); ;
                if(!reg.IsMatch(line))
                {
                    throw new ProgramException(ProgramException.SYNTAX_ERROR);
                }
                Match match = reg.Match(line);
                // [0-9]+ will always parse as an int
                uint line1 = uint.Parse(match.Groups[1].Value); ;
                uint line2 = uint.Parse(match.Groups[3].Value); ;
                char operation = match.Groups[2].Value[0]; ;
                switch(operation)
                {
                    case '+':
                        memory[currentLine]=GetMemory(line1).Plus(GetMemory(line2)); ;
                        break;
                    case '-':
                        memory[currentLine]=GetMemory(line1).Minus(GetMemory(line2)); ;
                        break;
                    case '*':
                        memory[currentLine]=GetMemory(line1).Asterisk(GetMemory(line2)); ;
                        break;
                    case '/':
                        memory[currentLine]=GetMemory(line1).Slash(GetMemory(line2)); ;
                        break;
                    case '^':
                        memory[currentLine]=GetMemory(line1).Carrot(GetMemory(line2)); ;
                        break;
                    case '%':
                        memory[currentLine]=GetMemory(line1).Percent(GetMemory(line2)); ;
                        break;
                }
            }
            // Check headers
            if(GetMemory(4).ToString() != "C-----C")
            {
                throw new ProgramException(ProgramException.SYNTAX_ERROR);
            }
        }
    }
}