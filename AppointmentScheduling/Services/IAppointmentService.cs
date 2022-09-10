using AppointmentScheduling.Models.ViewModels;

namespace AppointmentScheduling.Services
{
    public interface IAppointmentService
    {
        public List<DoctorVM> GetDoctorList();
        public List<PatientVM> GetPatientList();

        public Task<int> AddUpdate(AppointmentVM model);
    }
}
