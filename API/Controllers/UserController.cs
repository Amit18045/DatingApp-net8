using System;
using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers;

   [Authorize]
public class UserController(IUserRepository userRepository,IMapper mapper) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> user()
    {
        var users = await userRepository.GetMembersAsync();
        
        return Ok(users);
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<MemberDto>> Getuser(string username)
    {
        var user = await userRepository.GetMemberAsync(username);
        if (user == null) return NotFound();
        return user;
    }
    [HttpPut]
    public async Task<ActionResult>UpdateUser(MemberUpdateDto memberUpdateDto){
        var username=User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(username==null) return BadRequest("No UserName found in token");
        var user=await userRepository.GetUserByUserNameAsync(username);
        if(user==null) return BadRequest("Could not found");
        mapper.Map(memberUpdateDto,user);
        if(await userRepository.SaveAllAsync()) return NoContent();
        return BadRequest("Failed to update the user");
    }
}