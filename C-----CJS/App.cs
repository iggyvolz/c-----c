using System;
using Bridge;
using Bridge.Html5;

namespace C_____CJS
{
    public class App
    {
        public static void Main()
        {
            HTMLTextAreaElement input = Document.GetElementById<HTMLTextAreaElement>("input");
            HTMLButtonElement button = Document.GetElementById<HTMLButtonElement>("button");
            HTMLInputElement output = Document.GetElementById<HTMLInputElement>("output");
            // Create a new Button
            button.OnClick = (ev) =>
                {
                    // When Button is clicked, 
                    // the Bridge Console should open.
                    Compiler compiler = new Compiler(true);
                    try
                    {
                        string data = input.Value;
                        foreach (string line in data.Split("\n"))
                        {
                            compiler.Line(line);
                        }
                        output.Value = compiler.Return;
                    }
                    catch (ProgramException e)
                    {
                        output.Value = e.Message;
                    }
                    catch (Exception)
                    {
                        output.Value = ProgramException.DID_BAD;
                    }
                };
        }
    }
}