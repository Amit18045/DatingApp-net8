using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(DataContext context) : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>>GetUser()
        {
            var user = await context.Users.ToListAsync();
            return user;
        }

        [HttpGet("{id:int}")]
        public async Task <ActionResult<AppUser>> GetUserById(int id)
        {
            var user = await context.Users.FindAsync(id);
            if(user==null) NotFound();
            return user;
        }
    }
}
