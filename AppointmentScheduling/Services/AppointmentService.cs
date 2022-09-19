using AppointmentScheduling.Models.ViewModels;

namespace AppointmentScheduling.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly ApplicationDbContext _db;
        private readonly IEmailSender _emailSender;

        public AppointmentService(ApplicationDbContext db, IEmailSender emailSender)
        {
            _db = db;
            _emailSender = emailSender;
        }

        public async Task<int> AddUpdate(AppointmentVM model)
        {
                var vm = model;
            var startDate = DateTime.Parse(model.StartDate);
            var endDate = DateTime.Parse(model.StartDate).AddMinutes(Convert.ToDouble(model.Duration));

            var patient = _db.Users.FirstOrDefault(e => e.Id == model.PatientId);
            var doctor = _db.Users.FirstOrDefault(e => e.Id == model.DoctorId);

            if (model != null && model.Id > 0)
            {
                //update
                try
                {
                    var appointment = _db.Appointments.FirstOrDefault(x => x.Id == model.Id.GetValueOrDefault());
                    appointment.Title = model.Title;
                    appointment.Description = model.Description;
                    appointment.StartDate = startDate;
                    appointment.EndDate = endDate;
                    appointment.Duration = model.Duration;
                    appointment.DoctorId = model.DoctorId;
                    appointment.PatientId = model.PatientId;
                    appointment.isDoctorApproved = false;
                    appointment.AdminId = model.AdminId;
                    await _db.SaveChangesAsync();
                    return 1;
                }
                catch(Exception e)
                {
                    String innerMessage = (e.InnerException != null)
                      ? e.InnerException.Message
                      : "";
                    throw new Exception(innerMessage);
                }
            }
            else
            {
                //create
                Appointment appointment = new Appointment()
                {
                    Title = model.Title,
                    Description = model.Description,
                    StartDate = startDate,
                    EndDate = endDate,
                    Duration = model.Duration,
                    DoctorId = model.DoctorId,
                    PatientId = model.PatientId,
                    isDoctorApproved = false,
                    AdminId = model.AdminId,
                };
                 
                await _emailSender.SendEmailAsync(doctor.Email, "Appointment Created successfully", $"Your appointment with {patient.Name} is created and is in pending");
                await _emailSender.SendEmailAsync(patient.Email, "Appointment Created successfully", $"Your appointment with {doctor.Name} is created and is in pending");

                try
                {
                    _db.Appointments.Add(appointment);
                    await _db.SaveChangesAsync();
                    return 2;
                }
                catch (Exception e)
                {
                    String innerMessage = (e.InnerException != null)
                      ? e.InnerException.Message
                      : "";
                    throw new Exception(innerMessage);
                }
            }

        }

        public async Task<int> ConfirmEvent(int id)
        {
            var appointment = _db.Appointments.FirstOrDefault(x => x.Id == id);
            if (appointment != null)
            {
                appointment.isDoctorApproved = true;
                return await _db.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<int> DeleteEvent(int id)
        {
            var appointment = _db.Appointments.FirstOrDefault(x => x.Id == id);
            if (appointment != null)
            {
                _db.Appointments.Remove(appointment);
                return await _db.SaveChangesAsync();
            }
            return 0;
        }

        public List<AppointmentVM> DoctorEventById(string doctorId)
        {
            return _db.Appointments.Where(x => x.DoctorId == doctorId).ToList().Select(c => new AppointmentVM
            {
                Id = c.Id,
                Description = c.Description,
                StartDate = c.StartDate?.ToString("yyyy-MM-dd HH:mm:ss"),
                EndDate = c.EndDate?.ToString("yyyy-MM-dd HH:mm:ss"),
                Title = c.Title,
                Duration = c.Duration,
                isDoctorApproved = c.isDoctorApproved
            }).ToList();    
        }

        public AppointmentVM GetById(int id)
        {
            return _db.Appointments.Where(x => x.Id == id).ToList().Select(c => new AppointmentVM
            {
                Id = c.Id,
                Description = c.Description,
                StartDate = c.StartDate?.ToString("yyyy-MM-dd HH:mm:ss"),
                EndDate = c.EndDate?.ToString("yyyy-MM-dd HH:mm:ss"),
                Title = c.Title,
                Duration = c.Duration,
                isDoctorApproved = c.isDoctorApproved,
                PatientId = c.PatientId,
                DoctorId = c.DoctorId,
                PatientName =  _db.Users.Where(x=>x.Id == c.PatientId).Select(x=>x.Name).FirstOrDefault(),
                DoctorName = _db.Users.Where(x => x.Id == c.DoctorId).Select(x => x.Name).FirstOrDefault(),
            }).SingleOrDefault();
        }

        public List<DoctorVM> GetDoctorList()
        {
            var doctors = (from user in _db.Users
                           join userRoles in _db.UserRoles on user.Id equals userRoles.UserId
                           join roles in _db.Roles.Where(x=>x.Name==Helper.Doctor) on userRoles.RoleId equals roles.Id
                           select new DoctorVM
                           {
                               Id = user.Id,
                               Name = user.Name
                           }
                           ).ToList();  

            return doctors;
        }

        public List<PatientVM> GetPatientList()
        {
            var patient = (from user in _db.Users
                           join userRoles in _db.UserRoles on user.Id equals userRoles.UserId
                           join roles in _db.Roles.Where(x => x.Name == Helper.Patient) on userRoles.RoleId equals roles.Id
                           select new PatientVM
                           {
                               Id = user.Id,
                               Name = user.Name
                           }
                           ).ToList();

            return patient;
        }

        public List<AppointmentVM> PatientsEventById(string patientId)
        {
             return _db.Appointments.Where(x => x.PatientId == patientId).ToList().Select(c => new AppointmentVM
            {
                Id = c.Id,
                Description = c.Description,
                StartDate = c.StartDate?.ToString("yyyy-MM-dd HH:mm:ss"),
                EndDate = c.EndDate?.ToString("yyyy-MM-dd HH:mm:ss"),
                Title = c.Title,
                Duration = c.Duration,
                isDoctorApproved = c.isDoctorApproved
            }).ToList();    
        }
    }
}
