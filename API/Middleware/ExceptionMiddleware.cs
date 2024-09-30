using System;
using System.Net;
using System.Text.Json;
using API.DTOs;

namespace API.Middleware;

public class ExceptionMiddleware(RequestDelegate next,ILogger<ExceptionMiddleware> logger,IHostEnvironment env)
{
 public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {

            logger.LogError(ex, ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var respone = env.IsDevelopment() ?
             new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace)
             : new ApiException(context.Response.StatusCode, ex.Message, "Internal server error");

            var option = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            var json = JsonSerializer.Serialize(respone, option);
            await context.Response.WriteAsync(json);
        }
    }

}
