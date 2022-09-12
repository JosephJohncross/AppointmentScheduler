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
                },
                eventDisplay:'block',
                events: function (fetchInfo, successCallback, failureCallback) {
                    $.ajax({
                        url: `${routeURL}/api/Appointment/GetCalendarData?doctorId=` + $("#doctorId").val(),
                        type: 'GET',
                        dataType: 'JSON',
                        success: function (response) {
                            var events = [];
                            if (response.status === 1) {
                                $.each(response.dataenum, function (i, data) {
                                    events.push({
                                        title: data.title,
                                        description: data.description,
                                        start: data.startDate,
                                        end: data.endDate,
                                        backgroundColor: data.isDoctorApproved ? "#28a745" : "#dc3545",
                                        //borderColor: "#162466",
                                        textColor: "white",
                                        //boxShadow: '0px 0px 2px rgba(0,0,0,0.3)',
                                        id: data.id
                                    })
                                })
                            }
                            console.log(events);
                            successCallback(events);
                        },
                        error: function (xhr) {
                            $.notify('Error', 'error');
                        }
                    })
                },
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
var title = document.getElementById("title");
var appointmentDate = document.getElementById("appointmentDate");

function onShowModal(obj, isEventDetail) {
    appointmentInput.style.display = "block";
}

function onCloseForm() {
    appointmentInput.style.display = "none";
}
function onSubmitForm() {

    if (checkValidation()) {
        var requestData = {
        Id: parseInt($("#id").val()) + 1,
        Title: $("#title").val(),
        Description: $("#description").val(),
        StartDate: $("#appointmentDate").val(),
        Duration: $("#duration").val(),
        DoctorId: $("#doctorId").val(),
        PatientId: $("#patientId").val(),
        //AdminId: "1",
        //EndDate: Date.now().toString(),
        //AdminName: "asasa",
        //DoctorName: "sdsds",
        //PatientName: "ssa"
    }

        //var appointmentData =  await fetch(`${routeURL}/api/Appointment/SaveCalendarData`, {
   //     method: "POST",
   //     body: JSON.stringify(requestData),
   //     headers: {
   //         "Content-Type": "application/json;charset=utf-8"
   //     }
   //}).then(response => {
   //    if (response.status == 1) {
   //    console.log("success")
   //       /* $.notify(response.message, "success");*/
   //        if (appointmentInput.style.display !== "none") {
   //            onCloseForm();
   //        }
   //    }
   //    else {
   //        //$.notify(response.message, "error")
   //    }
   //}, error => {
   //    console.log("failure")
   //    $.notify(response.message, "error")
   //})
        $.ajax({
        url: `${routeURL}/api/Appointment/SaveCalendarData`,     
        type: 'POST',
        data: JSON.stringify(requestData),
        contentType: 'application/json',
        success: function (response) {
            if (response.status === 1 || response.status === 2) {
                $.notify(response.message, 'success');
                if (appointmentInput.style.display !== 'none') {
                    onCloseForm();
                }
            }
            else {
                $.notify(response.message, 'error')
            }
        },
        error: function (xhr) {
            $.notify('Error', 'error');
        }
    })
    }
}

function checkValidation() {
    var isValid = true;

    if (appointmentDate.value === undefined || appointmentDate.value === "") {
        isValid = false
        appointmentDate.style.borderColor = "red";
    }
    else {
        appointmentDate.style.borderColor = "rgba(107 114 128, 0.5)";
    }
    if (title.value === undefined || title.value === "") {
        isValid = false
        title.style.borderColor = "red";
    }
    else {
        title.style.borderColor = "rgba(107 114 128, 0.5)";
    }

    return isValid;
}

