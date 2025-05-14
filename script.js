// todo
// NONE!! <^_^>

function conlog(msg) {
  console.log(msg);
};
conlog("hiya! your javascript is enabled and working!")
conlog("^_^")
const apiLocation = "https://lwwwakhyleyaudjzhaoj.supabase.co"
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3d3dha2h5bGV5YXVkanpoYW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMDcxMDEsImV4cCI6MjA2Mjc4MzEwMX0.sN0Wlil2PTGpMY1kYkF-jE-uZZmsTz98UrUZJQpTb_M"

const exercises = [];
let currentExerciseIndex = 0;

// handle the theming
function applySystemTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

// get the exercises
async function fetchExercises() {
  try {
    const response = await fetch(`${apiLocation}/rest/v1/exercises?select=*`, {
      headers: {
        'apikey': apiKey,
        'Authorization': `Bearer ${apiKey}`
      }
    });

    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();

    if (data.length === 0) {
      alert("Harjutusi ei leitud!");
      return;
    }

    exercises.push(...data);
    loadExercise();

  } catch (error) {
    console.error("Error fetching exercises:", error);
    alert("Viga harjutuste laadimisel.");
  }
}

// ui
function loadExercise() {
  const textarea = document.getElementById("commaInput");
  const output = document.getElementById("highlightedOutput");

  textarea.value = exercises[currentExerciseIndex].no_commas;
  textarea.readOnly = false;
  output.style.display = "none";
  output.innerHTML = "";

  document.getElementById("submitBtn").disabled = false;
}

// submit button handle
function handleSubmit() {
  const textarea = document.getElementById("commaInput");
  const highlighted = document.getElementById("highlightedOutput");
  const userInput = textarea.value;
  const correct = exercises[currentExerciseIndex].original;

  textarea.readOnly = true;
  document.getElementById("submitBtn").disabled = true;
  highlighted.style.display = "block";

  const highlightedHTML = compareTextWithCommas(userInput, correct);
  highlighted.innerHTML = highlightedHTML;
}

// comma logic
function compareTextWithCommas(user, correct) {
  const userChars = [...user];
  // comment below is debug only
  // console.log('userChars', userChars)
  const correctChars = [...correct];

  let result = "";

  for (let i = 0; i < correctChars.length; i++) {
    const correctChar = correctChars[i];
    const userChar = userChars[i] ?? "";

    if (correctChar === "," && userChar === ",") {
      result += `<span class="correct">,</span>`;
    } else if (correctChar === "," && userChar !== ",") {
      result += `<span class="incorrect">,</span>`;
    } else if (correctChar !== "," && userChar === ",") {
      result += `<span class="incorrect">,</span>`;
    } else {
      result += correctChar;
    }
  }

  return result;
}

// button for next exercise
function nextExercise() {
  currentExerciseIndex = (currentExerciseIndex + 1) % exercises.length;
  loadExercise();
}

// run on page load
window.onload = () => {
  applySystemTheme();
  fetchExercises();
};