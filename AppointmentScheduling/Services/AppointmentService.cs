using AppointmentScheduling.Models.ViewModels;

namespace AppointmentScheduling.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly ApplicationDbContext _db;

        public AppointmentService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<int> AddUpdate(AppointmentVM model)
        {
            var startDate = DateTime.Parse(model.StartDate);
            var endDate = DateTime.Parse(model.StartDate).AddMinutes(Convert.ToDouble(model.Duration));

            if (model != null && model.Id > 0)
            {
                //update
                return 1;
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
                Duration = c.Duration,
                isDoctorApproved = c.isDoctorApproved
            }).ToList();    
        }
    }
}
