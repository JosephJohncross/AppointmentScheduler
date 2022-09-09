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
    var calendarEl = document.getElementById('calendar');

    try {

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
    catch (e) {
        console.log(e);
    }
})

function onShowModal(obj, isEventDetail) {
    var modal = document.getElementById('modal');
    var appointmentInput = document.getElementById('appointmentInput');
    appointmentInput.style.display = "block";
    var backdrop = document.getElementById('backdrop');
    modal.style.display = "block"
    backdrop.classList.add('animate-backdropIn')
    modal.classList.add('animate-modalIn')
}

