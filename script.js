function conlog(msg) {
  console.log(msg);
}

const exercises = [
  {
    original: "Kui hakkame midagi tegema, peame olema tähelepanelikud ja keskendunud.",
    noCommas: "Kui hakkame midagi tegema peame olema tähelepanelikud ja keskendunud."
  },
  {
    original: "Ma lähen poodi, ostan piima ja tulen tagasi.",
    noCommas: "Ma lähen poodi ostan piima ja tulen tagasi."
  }
];

let currentExerciseIndex = 0;

function applySystemTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

window.onload = () => {
  applySystemTheme();
  loadExercise();
};

function loadExercise() {
  const textarea = document.getElementById("commaInput");
  textarea.value = exercises[currentExerciseIndex].noCommas;
  textarea.readOnly = false;

  document.getElementById("highlightedOutput").style.display = "none";
  document.getElementById("submitBtn").disabled = false;
}

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

function compareTextWithCommas(user, correct) {
  const userChars = [...user];
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
      result += `<span class="incorrect">,</span>${userChar !== correctChar ? "" : ""}`;
    } else {
      result += correctChar;
    }
  }

  return result;
}

function nextExercise() {
  currentExerciseIndex = (currentExerciseIndex + 1) % exercises.length;
  loadExercise();
}
