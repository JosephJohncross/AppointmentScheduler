
var routeURL = location.protocol+"//"+location.host
var calendar;

document.addEventListener('DOMContentLoaded', function () {
    $("#appointmentDate").kendoDateTimePicker({
        value: new Date(),
        dateInput: false
    });
 
        var winWidth = window.innerWidth;
        if (winWidth >= 500) {
            try {

                var calendarEl = document.getElementById('calendar');
                if (calendarEl !== null) {
                    calendar = new FullCalendar.Calendar(calendarEl, {
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
                        eventDisplay: 'block',
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
                                    successCallback(events);
                                },
                                error: function (xhr) {
                                    $.notify('Error', 'error');
                                }
                            })
                        },
                        eventClick: function (info) {
                            console.log("Test true")
                            console.log(info)
                            getEventDetailsByEventId(info.event);
                        }
                    })
                    calendar.render();
                }
            }
            catch (e) {
                alert(e);
            }
        }
        else {
            try {

                var calendarEl = document.getElementById('calendar');
                if (calendarEl !== null) {
                    calendar = new FullCalendar.Calendar(calendarEl, {
                        timezone: false,
                        height: 'auto',
                        initialView: 'listWeek',
                        headerToolbar: {
                            left: 'prev,next',
                            right: 'listMonth,timeGridWeek,timeGridDay'
                        },
                        selectable: true,
                        editable: false,
                        select: function (event) {
                            onShowModal(event, null)
                        },
                        eventDisplay: 'block',
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
                                    successCallback(events);
                                },
                                error: function (xhr) {
                                    $.notify('Error', 'error');
                                }
                            })
                        },
                        eventClick: function (info) {
                            console.log("Test true")
                            console.log(info)
                            getEventDetailsByEventId(info.event);
                        }
                    })
                    calendar.render();
                }
            }
            catch (e) {
                alert(e);
            }
        }

})

var modalClose = document.getElementById('modal-close');
var appointmentInput = document.getElementById('appointmentInput');
var title = document.getElementById("title");
var appointmentDate = document.getElementById("appointmentDate");

function onShowModal(obj, isEventDetail) {
    if (isEventDetail != null) {
        $("#title").val(obj.title)
        $("#description").val(obj.description)
        $("#duration").val(obj.duration)
        $("#doctorId").val(obj.doctorId)
        $("#lblPatientName").html(obj.patientName)
        $("#lblDoctorName").html(obj.doctorName)
        $("#patientId").val(obj.patientId)
        $("#appointmentDate").val(obj.startDate)
        $("#id").val(obj.id)
        if (obj.isDoctorApproved) {
            $("#lblStatus").html("Approved")
            $("#modal-confirm").addClass("hidden")
            $("#modal-submit").addClass("hidden")
        }
        else {
            $("#lblStatus").html("Pending")
            $("#modal-submit").removeClass("hidden")
            $("#modal-confirm").removeClass("hidden")
        }
        $("#modal-delete").removeClass("hidden")
    }
    else {
        $("#appointmentDate").val(obj.startStr + " " + new moment().format("hh:mm A "))
        $("#modal-delete").addClass("hidden")
        $("#modal-submit").removeClass("hidden")


    }
    appointmentInput.style.display = "block";
}

function onCloseForm() {
    $("#appointmentForm")[0].reset();
    $("#title").val("")
    $("#description").val("")
   
    $("#appointmentDate").val("")
    $("#lblPatientName").html("")
    $("#lblDoctorName").html("")
    $("#id").val("")
    appointmentInput.style.display = "none";
}
function onSubmitForm() {

    if (checkValidation()) {
        var requestData = {
        Id: parseInt($("#id").val()),
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
                calendar.refetchEvents()
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

function getEventDetailsByEventId(info) {
    $.ajax({
        url: `${routeURL}/api/Appointment/GetCalendarDataById/` + info.id,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            if (response.status === 1 && response.dataenum != undefined) {
                onShowModal(response.dataenum, true)
            }
        },
        error: function (xhr) {
            $.notify('Error', 'error');
        }
    })
}

function onDoctorChange() {
    calendar.refetchEvents();
}

function onDeleteAppointment() {
    var id = +($("#id").val())
    $.ajax({
        url: `${routeURL}/api/Appointment/DeleteAppointment/` + id,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            if (response.status === 1) {
                $.notify(response.message, "success")
                calendar.refetchEvents();
                onCloseForm();
            }
            else {
                $.notify(response.message, "error")
            }
        },
        error: function (xhr) {
            $.notify('Error', 'error');
        }
    })
}

function onConfirm() {
    var id = +($("#id").val())
    $.ajax({
        url: `${routeURL}/api/Appointment/ConfirmAppointment/` + id,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            if (response.status === 1) {
                $.notify(response.message, "success")
                calendar.refetchEvents();
                onCloseForm();
            }
            else {
                $.notify(response.message, "error")
            }
        },
        error: function (xhr) {
            $.notify('Error', 'error');
        }
    })
}

function navToggler() {
    var mobileMenu = document.getElementById("mobileMenu");
    mobileMenu.classList.toggle('open');
}