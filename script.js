// ================= PARTICLES =================
const canvas = document.getElementById("particles");

if (canvas) {
  const ctx = canvas.getContext("2d");
  window.addParticles = function(n) {
  for (let i = 0; i < n; i++) particles.push(new Particle());
  }
  // Set initial canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  let mouse = { x: null, y: null };

  // Track mouse
  window.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        this.x -= dx / 25;
        this.y -= dy / 25;
      }

      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      ctx.fillStyle = "#a64dff";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    for (let i = 0; i < 250; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();
}
// ================= LEAVES =================
const leaves = document.querySelectorAll('.leaves span');
leaves.forEach(leaf => {
  leaf.style.top = `${Math.random() * window.innerHeight}px`;
  leaf.style.left = `${Math.random() * 100}%`;
  const duration = 7 + Math.random() * 5; 
  const delay = Math.random() * -5;
  leaf.style.animation = `float ${duration}s linear infinite`;
  leaf.style.animationDelay = `${delay}s`;
});

// ================= FIREBASE =================
const firebaseConfig = {
  apiKey: "AIzaSyAVlUv5MVuPIzecI-MGjLfESVGoXYexIg4",
  authDomain: "grow-us-724c2.firebaseapp.com",
  projectId: "grow-us-724c2",
  storageBucket: "grow-us-724c2.firebasestorage.app",
  messagingSenderId: "34496067763",
  appId: "1:34496067763:web:dbe4244bc7e85e8f5a18c6",
  measurementId: "G-ZNNYFPSQB4"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ================= AUTH MESSAGE =================
const authMessage = document.getElementById("authMessage");
function showMessage(msg, type="error") {
  if (!authMessage) return;
  authMessage.textContent = msg;
  authMessage.className = `auth-message ${type}`;
  authMessage.style.display = "block";
}

// ================= LOGIN / SIGNUP =================
if (document.getElementById("authForm")) {
  const form = document.getElementById("authForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const formTitle = document.getElementById("formTitle");
  const submitBtn = document.getElementById("submitBtn");
  const toggleText = document.getElementById("toggleText");

  let isSignIn = true;

  function updateToggleText() {
    if (isSignIn) {
      formTitle.textContent = "Sign In";
      submitBtn.textContent = "Sign In";
      toggleText.innerHTML = `Don't have an account? <a href="#" id="toggleLink">Sign Up</a>`;
    } else {
      formTitle.textContent = "Sign Up";
      submitBtn.textContent = "Sign Up";
      toggleText.innerHTML = `Already have an account? <a href="#" id="toggleLink">Sign In</a>`;
    }
    document.getElementById("toggleLink").addEventListener("click", toggleHandler);
  }

  function toggleHandler(e) {
    e.preventDefault();
    isSignIn = !isSignIn;
    showMessage("", ""); // clear message
    updateToggleText();
  }

  document.getElementById("toggleLink").addEventListener("click", toggleHandler);

  // Toggle password visibility
  togglePassword.addEventListener("click", () => {
    if (password.type === "password") {
      password.type = "text";
      togglePassword.textContent = "🙈";
    } else {
      password.type = "password";
      togglePassword.textContent = "👁️";
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userEmail = email.value.trim();
    const userPassword = password.value.trim();

    if (!isSignIn && userPassword.length < 8) {
      showMessage("Password must be at least 8 characters!", "error");
      return;
    }

    if (isSignIn) {
      auth.signInWithEmailAndPassword(userEmail, userPassword)
        .then(() => {
          showMessage("Login successful ✅", "success");
          setTimeout(() => window.location.href = "role.html", 800);
        })
        .catch(err => {
          showMessage("Wrong email or password ❌", "error");
        });
    } else {
      auth.createUserWithEmailAndPassword(userEmail, userPassword)
        .then(() => {
          showMessage("Account created 🎉", "success");
          setTimeout(() => window.location.href = "role.html", 1000);
        })
        .catch(err => {
          showMessage(err.message, "error");
        });
    }
  });
}

// ================= STAY LOGGED IN =================
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log("User is logged in:", user.email);
    // window.location.href = "role.html"; // optional
  } else {
    console.log("No user logged in");
  }
});
