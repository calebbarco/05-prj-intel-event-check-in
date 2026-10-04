// Getting all the needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const progressBar = document.getElementById("progressBar");
const attendeeCount = document.getElementById("attendeeCount");
const greeting = document.getElementById("greeting");
const waterCounter = document.getElementById("waterCount");
const zeroCounter = document.getElementById("zeroCount");
const powerCounter = document.getElementById("powerCount");
const attendeeList = document.getElementById("attendeeList");

// Tracking the attendance
let count = parseInt(localStorage.getItem("attendanceCount")) || 0;
const maxCount = 50;
const waterCount = parseInt(localStorage.getItem("waterCount")) || 0;
const zeroCount = parseInt(localStorage.getItem("zeroCount")) || 0;
const powerCount = parseInt(localStorage.getItem("powerCount")) || 0;
let attendees = JSON.parse(localStorage.getItem("attendees")) || [];

// Showing the saved attendance when the page loads
attendeeCount.textContent = count;
waterCounter.textContent = waterCount;
zeroCounter.textContent = zeroCount;
powerCounter.textContent = powerCount;
progressBar.style.width = Math.min(Math.round((count / maxCount) * 100), 100) + "%";

// Showing the saved attendee list
function displayAttendees() {
  attendeeList.innerHTML = "";

  if (attendees.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "attendee-empty";
    emptyMessage.textContent = "No attendee names saved yet.";
    attendeeList.appendChild(emptyMessage);
    return;
  }

  for (let i = 0; i < attendees.length; i++) {
    const listItem = document.createElement("li");
    listItem.className = "attendee-row";

    const name = document.createElement("span");
    name.className = "attendee-name";
    name.textContent = attendees[i].name;

    const team = document.createElement("span");
    team.className = `attendee-team ${attendees[i].team}`;
    team.textContent = attendees[i].teamName;

    listItem.appendChild(name);
    listItem.appendChild(team);
    attendeeList.appendChild(listItem);
  }
}

displayAttendees();

// Handling the form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Getting the form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);

  // Incrementing the count
  count++;
  attendeeCount.textContent = count;
  localStorage.setItem("attendanceCount", count);
  console.log("Total check-ins: ", count);

  // Updating the progress bar
  const percentage = Math.min(Math.round((count / maxCount) * 100), 100) + "%";
  progressBar.style.width = percentage;
  console.log(`Progress: ${percentage}`);

  // Updating the team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;
  localStorage.setItem(team + "Count", teamCounter.textContent);

  // Adding the attendee to the list
  attendees.push({ name: name, team: team, teamName: teamName });
  localStorage.setItem("attendees", JSON.stringify(attendees));
  displayAttendees();

  // Showing a simple welcome message
  const message = `Welcome ${name} from ${teamName}`;
  if (count === maxCount) {
    const waterTeamCount = parseInt(waterCounter.textContent);
    const zeroTeamCount = parseInt(zeroCounter.textContent);
    const powerTeamCount = parseInt(powerCounter.textContent);
    let highestCount = waterTeamCount;

    if (zeroTeamCount > highestCount) {
      highestCount = zeroTeamCount;
    }
    if (powerTeamCount > highestCount) {
      highestCount = powerTeamCount;
    }

    const winningTeams = [];
    if (waterTeamCount === highestCount) {
      winningTeams.push("Team Water Wise");
    }
    if (zeroTeamCount === highestCount) {
      winningTeams.push("Team Net Zero");
    }
    if (powerTeamCount === highestCount) {
      winningTeams.push("Team Renewables");
    }

    greeting.innerHTML = `Goal reached! Congratulations to <strong>${winningTeams.join(", ")}</strong>!`;
  } else {
    greeting.textContent = message;
  }
  greeting.classList.add("success-message");
  greeting.style.display = "block";
  console.log(message);

  form.reset();
});