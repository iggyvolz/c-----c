namespace C_____CJS
{
    public abstract class Data
    {
        public abstract Data Asterisk(Int other);
        public abstract Data Asterisk(String other);
        public Data Asterisk(Data other)
        {
            if (other is Int)
            {
                return Asterisk((Int)other);
            }
            else
            {
                return Asterisk((String)other);
            }
        }
        public abstract Data Carrot(Int other);
        public abstract Data Carrot(String other);
        public Data Carrot(Data other)
        {
            if (other is Int)
            {
                return Carrot((Int)other);
            }
            else
            {
                return Carrot((String)other);
            }
        }
        public abstract Data Minus(Int other);
        public abstract Data Minus(String other);
        public Data Minus(Data other)
        {
            if (other is Int)
            {
                return Minus((Int)other);
            }
            else
            {
                return Minus((String)other);
            }
        }
        public abstract Data Percent(Int other);
        public abstract Data Percent(String other);
        public Data Percent(Data other)
        {
            if (other is Int)
            {
                return Percent((Int)other);
            }
            else
            {
                return Percent((String)other);
            }
        }
        public abstract Data Plus(Int other);
        public abstract Data Plus(String other);
        public Data Plus(Data other)
        {
            if (other is Int)
            {
                return Plus((Int)other);
            }
            else
            {
                return Plus((String)other);
            }
        }
        public abstract Data Slash(Int other);
        public abstract Data Slash(String other);
        public Data Slash(Data other)
        {
            if (other is Int)
            {
                return Slash((Int)other);
            }
            else
            {
                return Slash((String)other);
            }
        }

        public new abstract string ToString();
    }
}