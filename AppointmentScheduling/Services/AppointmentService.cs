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

        public List<DoctorVM> GetDoctorList()
        {
            var doctors = (from user in _db.Users
                           select new DoctorVM
                           {
                               Id = Int32.Parse(user.Id),
                               Name = user.Name
                           }
                           ).ToList();

            return doctors;
        }

        public List<PatientVM> GetPatientList()
        {
            throw new NotImplementedException();
        }
    }
}
