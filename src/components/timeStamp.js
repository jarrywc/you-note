//timestamp code: 
var index = 0;
var lastDate = 0;

var title = document.querySelector("#title");
var hours = document.querySelector("#hours");
var minutes = document.querySelector("#minutes");
var seconds = document.querySelector("#seconds");

function createTimeString() {
    const timeArray = [hours.value, minutes.value, seconds.value];
    var time = "";
    timeArray.forEach((e) => {
        e = String(e);
        if (e.length == 1) {
            time = time.concat(("0" + e + ":"))
        } else {
            time = time.concat(e + ":");
        }
    })
    return time;
}
function renderTimeString() {
    var ul = document.querySelector("#timestamps")
    var li = document.createElement("li");
    li.innerHTML = `${createTimeString()} - ${title.value}`
    ul.appendChild(li);
}

function addTimeStamp() {
    const currentDate = (hours.value + minutes.value + seconds.value);
    console.log(currentDate);
    if (index == 0 || parseInt(currentDate > parseInt(lastDate))) {
        renderTimeString();
        lastDate = currentDate;
        index++;
        title.value = '';
        title.focus();
    } else if (parseInt(currentDate) <= parseInt(lastDate)) {
        window.alert("Increment the time");
        hours.focus();
    }
    else {
        window.alert("Error");
        title.value = '';
        title.focus();
    }


}