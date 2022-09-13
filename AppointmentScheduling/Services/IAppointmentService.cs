using AppointmentScheduling.Models.ViewModels;

namespace AppointmentScheduling.Services
{
    public interface IAppointmentService
    {
        public List<DoctorVM> GetDoctorList();
        public List<PatientVM> GetPatientList();

        public Task<int> AddUpdate(AppointmentVM model);

        public List<AppointmentVM> DoctorEventById(string doctorId);
        public List<AppointmentVM> PatientsEventById(string patientId);

        public AppointmentVM GetById(int id);

        public Task<int> DeleteEvent(int id);
        public Task<int> ConfirmEvent(int id);

    }
}
