using System;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ApplicationServiceExtension
{
    public static IServiceCollection AddApplicationService(this IServiceCollection service, 
    IConfiguration configuration)
    {

        service.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        service.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
        });
        service.AddCors();
        service.AddScoped<ITokenSerices, TokenService>();
        service.AddScoped<IUserRepository,UserRespository>();
        service.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        return service;
    }
}
