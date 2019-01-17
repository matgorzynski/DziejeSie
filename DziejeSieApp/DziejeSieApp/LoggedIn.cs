using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DziejeSieApp
{
    public static class LoggedIn
    {
        public static List<string> List = new List<string>();

        public static bool Contains(string login) { return List.Exists(x => x.Contains(login)); }
    }
}
