using System;

namespace API.Entities;

public class AppUser
{
public int Id { get; private set; }
public required string UserName { get;  set; }
public required byte[] PasswordHash { get;  set; }
public required byte[] Passwordsalt { get;  set; }

}
