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
//      THEN each time block is color-coded to indicate whether it is in the past, present, or future
//             past -- light gray
//             present -- yellow
//             future -- blue
//      WHEN I click into a time block
//      THEN I can enter an event
//      WHEN I click the save button for that time block
//      THEN the text for that event is saved in local storage
//      WHEN I refresh the page
//      THEN the saved events persist

//   Elements
// var schedApptEl      = $("textarea");

// Class elements
// var schedApptEl      = $(".schedAppt");

// ID elements
var DateEl      = $("#currentDay");
var hr07El      = $("#hr07");
var appt07El    = $("#appt07");
var btn07El     = $("#btn07");
// var timerEl = document.getElementById('countdown');
var time = dayjs().format("hh:mm:ss")
var prevHour = "";
var currHour = "";

var secondsCount = 0 ;
var stateSwitch = 0;

// Sets past,Present Future on init
function initTimeState() {
    console.log("InitTimeColor >>>>>>>>>>>>>>>>>>>>>>");
    console.log("hr07=>" + hr07El);

    
    for (let i = 7; i < 20; i++) {
        if (currHour < i) {
            $("#appt" + currHour).removeClass("future").addClass("past");
        } else if (currHour == i) {
            $("#appt"+ currHour + '"' ).removeClass("future").addClass("present");
        };
// // set attr /query/ set style
// // set innerHTML
    }
    prevHour = currHour;
    
}

function initTime() {
    console.log("initTime >>>>>>>>>>>>>>>>>>>>>>");
    currHour = dayjs().format("HH");
    console.log("hour =>" + currHour + "<<  typeof=>" + typeof currHour);
    // if (currHour !== prevHour){
        //     console.log("change attribute of prevHour");
        //     var genApptEl = $('"#hr"' + prevHour + '"' );
        //     console.log("genApptEl==>" + genApptEl)
        // }    
    prevHour = currHour;
}

// Check to see for an hour change
function checkTimeState() {
    console.log("CheckTimeColor >>>>>>>>>>>>>>>>>>>>>>");
    currHour = dayjs().format("HH");
    console.log("hour =>" + currHour + "<<  typeof=>" + typeof currHour);
    if (stateSwitch === 0) {
        initTimeState();

    }
    // if (currHour !== prevHour){
        //     console.log("change attribute of prevHour");
        //     var genApptEl = $('"#hr"' + prevHour + '"' );
        //     console.log("genApptEl==>" + genApptEl)
        // }    
    }
    
    // this set the time interval for 60 seconds
    function checkTime() {
    console.log("CheckTime >>>>>>>>>>>>>>>>>>>>>>");
    // Sets interval in variable
    var timerInterval = setInterval(function() {
        secondsCount++;
        if(secondsCount === 60) {
            console.log("60 seconds " + dayjs().format("hh:mm:ss"));
            secondsCount = 0;
            checkTimeState();        
        };  
        // Stops execution of action at set interval
        //   clearInterval(timerInterval);
        // Calls function to create and append image
    }, 1000);
} 
// checkTime();
// console.log("schedAppt=>" + schedApptEl.data);
console.log("hr07=>" + hr07El);
console.log(time)
function checkState() {
    switch (stateSwitch) {
        case 0:
            console.log("Application Initiated");
            // run setup
            // initialize variables
            // start the time interval for checking time
            initTimeState();
            stateSwitch = 1;
            break;
        case 1:
            console.log("In Process");
            // run run setup and initialize variables
            break;
    
        default:
            break;
    }
}
window.onload = initTime();
checkState();

DateEl.innerHTML = "Today is " + dayjs().format("dddd, MM/DD/YYYY");