// This a workday Scheduler
// User Story
//      AS AN employee with a busy schedule
//      I WANT to add important events to a daily planner
//      SO THAT I can manage my time effectively
// Acceptance Criteria
//  X    GIVEN I am using a daily planner to create a schedule
//  X    WHEN I open the planner
//  X    THEN the current day is displayed at the top of the calendar
//  X   WHEN I scroll down
//  X    THEN I am presented with time blocks for standard business hours
//      WHEN I view the time blocks for that day
//  X    THEN each time block is color-coded to indicate whether it is in the past, present, or future
//   X          past -- light gray
//   X          present -- yellow
//   X          future -- blue
//   X   WHEN I click into a time block
//   X   THEN I can enter an event
//   X   WHEN I click the save button for that time block
//   X   THEN the text for that event is saved in local storage
//   X   WHEN I refresh the page
//   X   THEN the saved events persist

var time = dayjs().format("hh:mm:ss")
var prevHour = "";
var currHour = "";

var secondsCount = 0 ;
var scheduleLS = ["&#20;","&#20;","&#20;","&#20;","&#20;","&#20;","&#20;","&#20;","&#20;","&#20;","&#20;","&#20;","&#20;"]


function retrieveLocalStorage () {
    // console.log("retrieveLocalStoragel >>>>>>>>>>>>>>>>>>>>>>");
    scheduleLS = JSON.parse(localStorage.getItem("schedule"));
    // populate the testareas
    $('textarea').each(function(idx) {
        $(this).val(scheduleLS[idx]);
    });
}

// Check to see for an hour change
function checkTimeState() {
    // console.log("CheckTimeState >>>>>>>>>>>>>>>>>>>>>>");
    currHour = dayjs().format("HH");
    if (currHour != prevHour) {
        $('textarea').removeClass("past present future");
        $('textarea').each(function(idx) {
            var apptHour = idx + 7;
            if (apptHour < currHour) {
                $(this).addClass("past");
            } else {
                if (apptHour == currHour) {
                    $(this).addClass("present");
                } else {
                    $(this).addClass("future");
                };
            };
        });
        prevHour = currHour;
    };
}
    
    // this set the time interval for 60 seconds
function checkTimeInterval() {
    // console.log("checkTimeInterval >>>>>>>>>>>>>>>>>>>>>>");
    var timerInterval = setInterval(function() {
        secondsCount++;
        if(secondsCount === 60) {
            secondsCount = 0;
            checkTimeState();        
        };  
    }, 1000);
}; 

// this is setup when document is finished loading
$(document).ready(function() {
    // console.log("document ready  >>>>>>>>>>>>>>>>>>>>>>");
    $("#currentDay").html("Today is " + dayjs().format("dddd, MM/DD/YYYY"));
    $('textarea').removeClass("past present future");
    currHour = dayjs().format("HH");
    $('textarea').each(function(idx) {
        var apptHour = idx + 7;
        if (apptHour < currHour) {
            $(this).addClass("past");
        } else {
            if (apptHour == currHour) {
                $(this).addClass("present");
            } else {
                $(this).addClass("future");
            };
        };
    });
    prevHour = currHour;
    checkTimeInterval();
    retrieveLocalStorage();

    // handleEvent
    // $("#planner").click(function (event) {
    $("#planner").on("click", function (event) {
    // function handleEvent(event) {
        console.log("handleEvent >>>>>>>>>>>>>>>>>>>>>>");
        if (event.target !== event.currentTarget) {
        //   console.log ("event target localName=>", event.target.localName);
        //   console.log ("event target id=>", event.target.id);
        //   console.log ("event=>", event);
        //   if (event.target.localName !== "button") {
            // console.log(event.target.localName, " not = button");
        //   };
          if (event.target.localName == "button") {
            switch (event.target.id) {
            case "btn07":
                scheduleLS[0] = $("#appt07").val();
                break;
            case "btn08":
                scheduleLS[1] = $("#appt08").val();
                break;
            case "btn09":
                scheduleLS[2] = $("#appt09").val();
                break;
            case "btn10":
                scheduleLS[3] = $("#appt10").val();
                break;
            case "btn11":
                scheduleLS[4] = $("#appt11").val();
                break;
            case "btn12":
                scheduleLS[5] = $("#appt12").val();
                break;
            case "btn13":
                scheduleLS[6] = $("#appt13").val();
                break;
            case "btn14":
                scheduleLS[7] = $("#appt14").val();
                break;
            case "btn15":
                scheduleLS[8] = $("#appt15").val();
                break;
            case "btn16":
                scheduleLS[9] = $("#appt16").val();
                break;
            case "btn17":
                scheduleLS[10] = $("#appt17").val();
                break;
            case "btn18":
                scheduleLS[11] = $("#appt18").val();
                break;
            case "btn19":
                scheduleLS[12] = $("#appt19").val();
                break;
            default:
                console.log("no button should get here");
                console.log(event);
                break;
          };
          };
          
        //   if (event.target.localName === 'button') {
        //     console.log("save textarea=>", event.target.dataset.time);
        //     var btnTime = event.target.dataset.time;
        //     $('textarea').each(function(idx) {
        //         scheduleLS[idx] =  $(this).val();
        //     })
            localStorage.setItem("schedule", JSON.stringify(scheduleLS));
        };
    // stop bubbling
    // event.stopPropagation();
    });
});
