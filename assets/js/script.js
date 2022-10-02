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

var time = dayjs().format("hh:mm:ss")
var prevHour = "";
var currHour = "";

var secondsCount = 0 ;
var stateSwitch = 0;
var scheduleLS = ["&#20;","&#20;","&#20;","&#20;","&#20;","&#20;","&#20;","&#20;","&#20;","&#20;","&#20;","&#20;","&#20;"]

// 
// var plannerEl = document.querySelector("#planner");
// plannerEl.addEventListener("click", handleEvent, false);


document.querySelector("#planner").addEventListener("click", handleEvent, false);
// $("#planner").on("click", handleEvent, false);

function handleEvent(event) {
    // console.log("handleEvent >>>>>>>>>>>>>>>>>>>>>>");
    if (event.target !== event.currentTarget) {
    //   console.log ("type target event=>", event.target.localName)
    //   console.log ("event=>", event)
      if (event.target.localName === 'button') {
        // console.log("save textarea=>", event.target.dataset.time);
        // var btnTime = event.target.dataset.time;
        $('textarea').each(function(idx) {
            scheduleLS[idx] =  $(this).val();
        })
        localStorage.setItem("schedule", JSON.stringify(scheduleLS));
    };
};
// stop bubbling
event.stopPropagation();
};

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
});

// DateEl.innerHTML = "Today is " + dayjs().format("dddd, MM/DD/YYYY");
// console.log("display current date " + dayjs().format("dddd, MM/DD/YYYY"))
// console.log(time)