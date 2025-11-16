using EventHub.Hubs;
using EventHub.Services;
using EventHub.Config;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Load config
builder.Services.Configure<RabbitMqConfig>(builder.Configuration.GetSection("RabbitMQ"));

// Add SignalR
builder.Services.AddSignalR();

// Add RabbitMqListener & MessageDispatcher as singletons
builder.Services.AddSingleton<MessageDispatcher>();
builder.Services.AddHostedService<RabbitMqListener>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()
              .SetIsOriginAllowed(_ => true); // allow all origins for dev
    });
});



var app = builder.Build();

app.UseCors();

app.MapHub<MessageHub>("/messages");

app.Run();