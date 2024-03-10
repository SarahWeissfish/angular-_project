using Microsoft.AspNetCore.Mvc;
using serverAngular.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace serverAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        public static List<Category> CATEGORIES = new List<Category>
        {
            new Category(1,"שפות","eefd//afadfa"),
            new Category(2,"עיצוב","eefd//afadfa"),
            new Category(3,"mbb","eefd//afadfa"),
    };
        // GET: api/<Category>
        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return CATEGORIES;
        }

        // GET api/<Category>/5
        [HttpGet("{id}")]
        public Category Get(int id)
        {
            var c= CATEGORIES.Find(x=>x.code==id);
            return c;
        }

        // POST api/<Category>
        [HttpPost]
        public void Post([FromBody] Category value)
        {
            CATEGORIES.Add(value);
        }

        // PUT api/<Category>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Category value)
        {
            var cat = CATEGORIES.Find(x => x.code == id);
            if (cat != null)
            {
                cat.iconRouting = value.iconRouting;
                cat.name = value.name;
            }
        }

        // DELETE api/<Category>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var cat = CATEGORIES.Find(x => x.code == id);
            if (cat != null)
                CATEGORIES.Remove(cat);
        }
    }
}
