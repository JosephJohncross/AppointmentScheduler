
using Mailjet.Client;
using Mailjet.Client.Resources;
using Newtonsoft.Json.Linq;
namespace AppointmentScheduling.Utility
{
    public class EmailSender : IEmailSender
    {

        private readonly IConfiguration _config;
        public EmailSender(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            MailjetClient client = new MailjetClient(_config["EmailApiKey"], _config["SKey"])
            {
                
            };
            MailjetRequest request = new MailjetRequest
            {
                Resource = Send.Resource,
            }
            .Property(Send.FromEmail, "josephibochi@gmail.com")
            .Property(Send.FromName, "Appointment Scheduler")
            .Property(Send.Subject, subject)
            .Property(Send.HtmlPart, htmlMessage)
            .Property(Send.Recipients, new JArray {
                new JObject {
                 {"Email", email}
                 }
                });
            MailjetResponse response = await client.PostAsync(request);
        }
    }
}
