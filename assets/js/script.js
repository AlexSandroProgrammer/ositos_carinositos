// Audio playback function
function playBirthdayAudio() {
  const audio = document.getElementById("audio");
  if (audio) {
    // Try to play audio immediately
    audio.play().catch((e) => {
      console.log("Autoplay was prevented, trying on user interaction");
      // If autoplay fails, try on first user interaction
      document.addEventListener(
        "click",
        function enableAudio() {
          audio.play().catch((err) => console.log("Audio play failed"));
          document.removeEventListener("click", enableAudio);
        },
        { once: true }
      );

      // Also try on any touch interaction (for mobile)
      document.addEventListener(
        "touchstart",
        function enableAudioTouch() {
          audio.play().catch((err) => console.log("Audio play failed"));
          document.removeEventListener("touchstart", enableAudioTouch);
        },
        { once: true }
      );
    });
  }
}

// Birthday countdown functionality
function updateCountdown() {
  const now = new Date().getTime();
  const birthday = new Date("August 6, 2025 00:00:00").getTime();
  const distance = birthday - now;

  if (distance > 0) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
    document.getElementById("days-left").textContent = days;

    // Show countdown container
    document.getElementById("countdown-container").classList.remove("hidden");
    document.getElementById("birthday-celebration").classList.add("hidden");
  } else {
    // It's her birthday!
    document.getElementById("countdown-container").classList.add("hidden");
    document.getElementById("birthday-celebration").classList.remove("hidden");

    // Play audio when it's her birthday
    playBirthdayAudio();
  }
}

// Check if it's birthday and play audio on page load
function initializePage() {
  const now = new Date().getTime();
  const birthday = new Date("August 6, 2025 00:00:00").getTime();
  const distance = birthday - now;

  // If it's already her birthday (August 6th or later), play audio immediately
  if (distance <= 0) {
    setTimeout(() => {
      playBirthdayAudio();
    }, 1000);
  }
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
      }
    }
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all scroll animation elements
document.querySelectorAll(".scroll-animation").forEach((el) => {
  observer.observe(el);
});

// Initialize page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize first section animations
  const firstSection = document.querySelector("#inicio .scroll-animation");
  if (firstSection) {
    setTimeout(() => {
      document.querySelectorAll("#inicio .scroll-animation").forEach((el) => {
        el.classList.add("visible");
      });
    }, 500);
  }

  // Initialize page and check if audio should play
  initializePage();
});
