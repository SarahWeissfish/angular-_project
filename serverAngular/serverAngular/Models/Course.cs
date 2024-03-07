using DocumentFormat.OpenXml.Office2010.Excel;
using DocumentFormat.OpenXml.Wordprocessing;
using static System.Net.Mime.MediaTypeNames;

namespace serverAngular.Models
{
    public class Course
    {
        //    code?:number;
        //name?:string;
        //category?:number;
        //countLesson?:number;
        //date:Date;
        //sillibos:string[];
        //wayLearning:type;
        //codeLecturer?:number;
        //image:string;
        public int code { get; set; }
        public string name { get; set; }
        public int category { get; set; }
        public int countLesson { get; set; }
        public string date { get; set; }
        public string[] sillibos { get; set; }
        public int wayLearning { get; set; }
        public int codeLecturer { get; set; }
        public string image { get; set; }
        public Course(int id,string n, int catId, int amount, string beginDate, string[] syllabus, int learningType, int lecturerId, string img)
        {
            code = id;
            name = n;
            category = catId;
            countLesson = amount;
            date = beginDate;
            sillibos = syllabus;
            wayLearning = learningType;
            codeLecturer = lecturerId;
            image = img;
        }
        public Course()
        {
            
        }

    }
}
