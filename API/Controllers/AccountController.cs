using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class AccountController(DataContext context,ITokenSerices tokenSerices) : BaseApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExist(registerDto.UserName)) return Unauthorized("UserName is taken");

            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                UserName = registerDto.UserName,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                Passwordsalt = hmac.Key,
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();
            return new UserDto{
                UserName=user.UserName,
                Token=tokenSerices.CreateToken(user)
            } ;
        }



        [HttpPost("login")]

        public async Task<ActionResult<UserDto>> login(LoginDto loginDto)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.UserName.ToLower());
            if (user == null) return Unauthorized("Invalid Username");

            using var hmac = new HMACSHA512(user.Passwordsalt);
            var computedPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedPassword.Length; i++)
            {
                if (computedPassword[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");

            }
            return new UserDto{
                UserName=user.UserName,
                Token=tokenSerices.CreateToken(user)
            };
        }
        private async Task<bool> UserExist(string username)
        {
            return await context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
        }
    }
}
