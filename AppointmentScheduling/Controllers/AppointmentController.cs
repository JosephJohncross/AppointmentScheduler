using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduling.Controllers
{
    public class AppointmentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
