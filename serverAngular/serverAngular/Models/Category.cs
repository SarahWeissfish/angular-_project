using DocumentFormat.OpenXml.Office2010.Excel;
using DocumentFormat.OpenXml.Wordprocessing;

namespace serverAngular.Models
{
    public class Category
    {
        public int code { get; set; }
        public string name { get; set; }
        public string  iconRouting { get; set; }
        public Category(int id,string n, string icon)
        {
            code =id; name = n; iconRouting = icon;
        }
    }
}
