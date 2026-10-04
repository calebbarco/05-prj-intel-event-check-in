// Getting all the needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Tracking the attendance
let count = 0;
const maxCount = 50;

// Handling the form submission
form.addEventListener("submit", function (e) {
  event.preventDefault();

  // Getting the form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);

  // Incrementing the count
  count++;
  console.log("Total check-ins: ", count);

  // Updating the progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  console.log(`Progress: ${percentage}`);

  // Updating the team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Showing a simple welcome message
  const message = `Welcome ${name} from ${teamName}`;
  console.log(message);

  form.requestFullscreen();
});