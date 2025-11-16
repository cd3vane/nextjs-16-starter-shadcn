using System.Threading.Tasks;
using EventHub.Hubs;
using EventHub.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace EventHub.Services;

public class MessageDispatcher(ILogger<MessageDispatcher> logger, IHubContext<MessageHub> hubContext)
{
    public async Task DispatchAsync(Message message)
    {
        logger.LogInformation("Dispatching message: {Message}", message.Text);
        await hubContext.Clients.All.SendAsync("ReceiveMessage", message.Text);
    }
}