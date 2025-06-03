//load component function
function loadComponent(id, file, callback) {
  return fetch(file)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (callback) callback(); // Run additional logic once loaded
    });
}

// Load all components
document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
    loadComponent('home', '/components/home.html', setupTypedEffect),
    loadComponent('techStack', '/components/techStack.html'),
    loadComponent('about', '/components/about.html'),
    loadComponent('projects', '/components/projects.html')
  ]).then(() => {
    // Initialize AOS once all components are loaded
    setupDarkMode();
    AOS.init();
  });
});


// Setup Typed.js (must be called after home.html is loaded)
function setupTypedEffect() {
  new Typed('#typed-text', {
    strings: ['Jerico Labajo', 'C# Developer', 'Asp.Net Core'],
    typeSpeed: 30,
    backSpeed: 20,
    backDelay: 1500,
    startDelay: 500,
    loop: true,
    smartBackspace: true
  });
}

// Setup dark mode toggle (must be called after navbar.html is loaded)
function setupDarkMode() {
  const switchToggle = document.getElementById('darkModeSwitch');

  if (!switchToggle) return; // Safety check

  // Load initial state
  if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark-mode');
    switchToggle.checked = true;
  }

  switchToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', switchToggle.checked);
  });
}
