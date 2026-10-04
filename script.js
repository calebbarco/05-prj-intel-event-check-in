// Getting all the needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const progressBar = document.getElementById("progressBar");
const attendeeCount = document.getElementById("attendeeCount");
const greeting = document.getElementById("greeting");

// Tracking the attendance
let count = 0;
const maxCount = 50;

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
  console.log("Total check-ins: ", count);

  // Updating the progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  progressBar.style.width = percentage;
  console.log(`Progress: ${percentage}`);

  // Updating the team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Showing a simple welcome message
  const message = `Welcome ${name} from ${teamName}`;
  greeting.textContent = message;
  greeting.classList.add("success-message");
  greeting.style.display = "block";
  console.log(message);

  form.reset();
});