function conlog(msg) {
  console.log(msg);
}

function applySystemTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
  
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
  }
  
  function handleSubmit() {
    const textarea = document.getElementById('commaInput');
    const highlighted = document.getElementById('highlightedOutput');
  
    textarea.readOnly = true;
  
    // Placeholder — this would be replaced with actual comparison logic
    highlighted.innerHTML = `Kui hakkame midagi tegema<span class="correct">,</span> peame olema tähelepanelikud<span class="incorrect">,</span> ja keskendunud.`;
    highlighted.style.display = 'block';
  }
  
  window.onload = applySystemTheme;
  