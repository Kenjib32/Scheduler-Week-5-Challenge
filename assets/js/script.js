//Schedule remark container
var hoursArr = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM","6PM",];
var today = moment(); $("#currentDay").text(today.format("dddd, MMMM Do"));
var timeBlocks = $("#time-blocks");

$.each(hoursArr, function(i, hours) {
var scheduleCtr = $("<form>");    
scheduleCtr.addClass("row time-block");
var hour = $("<label>");
hour.addClass("col-12 col-sm-11 col-lg-1 hour textarea");
hour.text(hours);

var scheduleHr = moment(hours, "h a"); 
var scheduleHrPlus1 = moment(hours, "h a").add(1, "h");
var scheduleRemark = JSON.parse(localStorage.getItem("scheduleRemark")) || [];
var remark = $("<input>");
remark.addClass("col-12 col-sm-3 col-lg-9 description textarea");
remark.attr("id", "remark" + i);
remark.val(scheduleRemark[i]);
console.log(i, scheduleRemark[i]);

//Conditional statements in separating the remark container
if (today.isSame(scheduleHr) || today.isBetween(scheduleHr, scheduleHrPlus1)) {
    remark.addClass("present");
}
else if (scheduleHr.isBefore(today)) {
    remark.addClass("past");
}
else if (scheduleHr.isAfter(today)) {
    remark.addClass("future");
}

//Save button 
var saveBtn = $("<button>");
saveBtn.addClass("col-12 col-sm-10 col-lg-2 saveBtn");
saveBtn.attr("savedRmk", i);  // set the data index to be the index
saveBtn.html('<i class="fas fa-save"></i>');    // icon for the save button
scheduleCtr.append(hour, remark, saveBtn);
timeBlocks.append(scheduleCtr);
});

//Save function (Saved data to and from the local storage)
function handleSaveItem(event) {
event.preventDefault();
var storeBtn = $(event.target);
var memory = 0;
if (storeBtn.attr("savedRmk") === undefined) {
    console.log(storeBtn.parent().attr("savedRmk"));
    memory = storeBtn.parent().attr("savedRmk");
}

else {
    console.log(storeBtn.attr("savedRmk"));
    memory = storeBtn.attr("savedRmk");
}
var scheduleRemark = JSON.parse(localStorage.getItem("scheduleRemark")) || [];
scheduleRemark[memory] = $("#remark" + memory).val();
console.log($("#remark" + memory).val());
localStorage.setItem("scheduleRemark", JSON.stringify(scheduleRemark));
}

timeBlocks.on("click", ".saveBtn", handleSaveItem);