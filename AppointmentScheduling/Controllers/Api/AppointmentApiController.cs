using AppointmentScheduling.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AppointmentScheduling.Controllers.Api
{
    [ApiController]
    [Route("api")]
    public class AppointmentApiController : Controller
    {
        private readonly IAppointmentService _appointmentService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly string loginUserId;
        private readonly string role;

        public AppointmentApiController(IAppointmentService appointmentService, IHttpContextAccessor httpContextAccessor)
        {
            _appointmentService = appointmentService;
            _httpContextAccessor = httpContextAccessor;
            loginUserId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            role = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);
        }

        [HttpPost]
        [Route("Appointment/SaveCalendarData")]
        public IActionResult SaveCalendarData(AppointmentVM data)
        {
            CommonResponse<int> commonResponse = new CommonResponse<int>();
            try
            {
                commonResponse.status = _appointmentService.AddUpdate(data).Result;
                if (commonResponse.status == 1)
                {
                    commonResponse.message = Helper.appointmentUpdated;
                }
                if (commonResponse.status == 2)
                {
                    commonResponse.message = Helper.appointmentAdded;
                }
            }
            catch(Exception ex)
            {
                commonResponse.message = ex.Message;
                commonResponse.status = Helper.failure_code;
            }

            return Ok(commonResponse); 
        }

        [HttpGet]
        [Route("Appointment/GetCalendarData")]
        public IActionResult GetCalendarData(string doctorId)
        {
            CommonResponse<List<AppointmentVM>> commonResponse = new CommonResponse<List<AppointmentVM>>();
            try
            {
                if (role == Helper.Patient)
                {
                    commonResponse.dataenum = _appointmentService.PatientsEventById(loginUserId);
                    commonResponse.status = Helper.success_code;
                }
                else if (role == Helper.Doctor)
                {
                    commonResponse.dataenum = _appointmentService.DoctorEventById(loginUserId);
                    commonResponse.status = Helper.success_code;

                }
                else
                {
                    commonResponse.dataenum = _appointmentService.DoctorEventById(doctorId);
                    commonResponse.status = Helper.success_code;

                }
            }
            catch(Exception ex)
            {
                commonResponse.message = ex.Message;
                commonResponse.status = Helper.failure_code;
                throw new Exception(ex.Message);
            }

            return Ok(commonResponse);
        }

        [HttpGet]
        [Route("Appointment/GetCalendarDataById/{id}")]
        public IActionResult GetCalendarDataById(int id)
        {
            CommonResponse<AppointmentVM> commonResponse = new CommonResponse<AppointmentVM>();
            try
            {
                
                    commonResponse.dataenum = _appointmentService.GetById(id);
                    commonResponse.status = Helper.success_code;

            }
            catch (Exception ex)
            {
                commonResponse.message = ex.Message;
                commonResponse.status = Helper.failure_code;
                throw new Exception(ex.Message);
            }

            return Ok(commonResponse);
        }

        [HttpGet]
        [Route("Appointment/DeleteAppointment/{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            CommonResponse<int> commonResponse = new CommonResponse<int>();
            try
            {

                commonResponse.status = await _appointmentService.DeleteEvent(id);
                commonResponse.message = commonResponse.status == 1? Helper.appointmentDeleted: Helper.somethingWentWrong;

            }
            catch (Exception ex)
            {
                commonResponse.message = ex.Message;
                commonResponse.status = Helper.failure_code;
                throw new Exception(ex.Message);
            }

            return Ok(commonResponse);
        }

        [HttpGet]
        [Route("Appointment/ConfirmAppointment/{id}")]
        public async Task<IActionResult> ConfirmAppointment(int id)
        {
            CommonResponse<int> commonResponse = new CommonResponse<int>();
            try
            {
                var result = _appointmentService.ConfirmEvent(id).Result;
                if (result > 0)
                {
                    commonResponse.status = Helper.success_code;
                    commonResponse.message = Helper.meetingConfirmed;
                }
                else
                {
                    commonResponse.status = Helper.failure_code;
                    commonResponse.message = Helper.meetingConfirmedError; 
                }

            }
            catch (Exception ex)
            {
                commonResponse.message = ex.Message;
                commonResponse.status = Helper.failure_code;
                throw new Exception(ex.Message);
            }

            return Ok(commonResponse);
        }
    }
}
