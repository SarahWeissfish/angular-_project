using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Mvc;
using serverAngular.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace serverAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
       
        public static List<User> USERS = new List<User>
        {
           new User{code=1,name="chana",address="רחוב במכבים 6", email="r0542@gmail.com",password="Aa!2Sd" ,lecturer=false},
           new User{code=2,name="ruth",address="רחוב פוברסקי 6" ,email="785sdf1@gmail.com",password="Aa!2Sd",lecturer=true},
           new User{code=3,name="tami",address="רחוב השומר 45", email="we2421@gmail.com",password="Aa!2Sd",lecturer=false},
          new User{code=4,name="rivki",address="נחום 23", email="df245@gmail.com",password="Aa!2Sd",lecturer=true }
        };
        // GET: api/<user>
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return  USERS;
        }

        // GET api/<user>/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            string erorr = "";
            var u = USERS.Find(x => x.code==id);
            return u;
        }

        // GET api/<user>/5
        // [HttpGet("user={user}")]
        //public User Get(User user)
        // {
        //     string erorr = "";
        //     var u =USERS.Find(x=>x.name.Equals(user.name)&&x.password.Equals(user.password));
        //     if (u == null)
        //     { 
        //         u = USERS.Find(x => x.name.Equals(user.name));
        //         if (u != null)
        //             erorr = "the password not valid";
        //         else
        //             erorr = "the user not exist";
        //         return null;
        //         //return erorr;
        //     }

        //     return u;
        // }
        [HttpPost("login={name}")]
        public User Post(string name, [FromBody] User value)
        {
            var u = USERS.Find(x => x.name.Equals(value.name) && x.password.Equals(value.password));
            if (u != null)
                return u;
            u = USERS.Find(x => x.name.Equals(name));
            if (u != null)
            {
                value.code = -1;
                return value;
            }
            return null;
        }
        // POST api/<user>
        [HttpPost]
        public User Post([FromBody] User value)
        {
            string erorr = "";
            var u = USERS.Find(x => x.name.Equals(value.name) && x.password.Equals(value.password));
            if (u != null)
                return null;
            value.code = USERS.Max(s => s.code) + 1;
            Console.WriteLine(value);
            USERS.Add(value);
            return value;
        }

        // PUT api/<user>/5
        [HttpPut("{id}")]
        public bool Put(int id, [FromBody] User value)
        {
            var u = USERS.Find(x => x.name.Equals(value.name));
            if (u != null)
            {
                u.name = value.name;
                u.address = value.address;
                u.email = value.email;
                u.password = value.password;
                u.lecturer = value.lecturer;
                return true;
            }
            return false;
        }

        // DELETE api/<user>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = USERS.Find(s => s.code == id);
            USERS.Remove(user);
            if (!USERS.Contains(user))
                return Ok();
            return BadRequest("the deleted not exsses"); ;
        }
    }
}
