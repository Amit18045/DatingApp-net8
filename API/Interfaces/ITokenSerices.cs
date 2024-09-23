using System;
using API.Entities;

namespace API.Interfaces;

public interface ITokenSerices
{
string CreateToken( AppUser user);
}
