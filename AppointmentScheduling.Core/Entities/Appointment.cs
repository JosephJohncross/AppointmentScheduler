using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentScheduling.Core.Entities
{
    public class Appointment
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        [Column(TypeName = "DateTime")] 
        public DateTime? StartDate { get; set; }
        [Column(TypeName = "DateTime")] 
        public DateTime? EndDate { get; set; }
        public int Duration { get; set; }
        public string DoctorId { get; set; }
        public string PatientId { get; set; }
        public bool isDoctorApproved { get; set; }
        public string? AdminId { get; set; }
    }
}
