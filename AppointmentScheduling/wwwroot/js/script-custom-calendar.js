var routeURL = location.protocol+"//"+location.host

document.addEventListener('DOMContentLoaded', function () {
    $("#appointmentDate").kendoDateTimePicker({
        value: new Date(),
        dateInput: false
    });

    try {
        var calendarEl = document.getElementById('calendar');

        if (calendarEl !== null) {
            var calendar = new FullCalendar.Calendar(calendarEl, {
            timezone: false,
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            selectable: true,
            editable: false,
            select: function (event) {
                onShowModal(event, null)
            }
        })
            calendar.render();
        }
    }
    catch (e) {
        alert(e);
    }
})

var modalClose = document.getElementById('modal-close');
var appointmentInput = document.getElementById('appointmentInput');

function onShowModal(obj, isEventDetail) {
    appointmentInput.style.display = "block";
}

function onCloseForm() {
    appointmentInput.style.display = "none";
}
async function onSubmitForm() {
    var requestData = {
        Id: +(document.getElementById("Id")),
        Title: $("#title").val(),
        Description: $("#description").val(),
        StartDate: $("#appointmentDate").val(),
        Duration: $("#duration").val(),
        DoctorId: $("#doctorId").val(),
        PatientId: $("#patients").val(),
    }

   var appointmentData =  await fetch(`${routeURL} + /api/Appointment/SaveCalendarData`, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        }
        
   })
    appointmentData.then(response => {
        if (response.status == 1) {
            $.notify(response.message, "success");
            if (appointmentInput.style.display !== "none") {
                onCloseForm();
            }
        }
        else {
            $.notify(response.message, "error")
        }
    }, error => {
        $.notify(response.message, "error")
    })
}

