//$(document).ready(function () {
//    InitializeCalendar();
//});

//function InitializeCalendar() {
//    try {
//        $('#calendar').fullCalendar({
//            timezone: false,
//            header: {
//                left: 'prev,next,today',
//                center: 'title',
//                right: 'month, agendaWeek, agendaDay'
//            },
//            selectable: true,
//            editable: false,
//        });
//    }
//    catch (e) {
//        alert(e);
//    }
//}

document.addEventListener('DOMContentLoaded', function () {

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

