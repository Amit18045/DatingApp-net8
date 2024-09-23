using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class UserController(DataContext context) : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>>GetUser()
        {
            var user = await context.Users.ToListAsync();
            return user;
        }
[Authorize]
        [HttpGet("{id:int}")]
        public async Task <ActionResult<AppUser>> GetUserById(int id)
        {
            var user = await context.Users.FindAsync(id);
            if(user==null) NotFound();
            return user;
        }
    }
}
