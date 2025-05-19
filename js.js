// -------------------- Currency Dropdown --------------------
function toggleCurrencyDropdown(event) {
  event.preventDefault();
  const dropdown = document.getElementById("currency-dropdown");
  dropdown.classList.toggle("show");
}

document.addEventListener("click", function (e) {
  const currencyBtn = document.getElementById("current-currency");
  const dropdown = document.getElementById("currency-dropdown");

  if (!currencyBtn.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.remove("show");
  }
});

function setCurrency(code, flag) {
  const current = document.getElementById("current-currency");
  current.textContent = `${code} ${flag}`;
  document.getElementById("currency-dropdown").classList.remove("show");
}

// -------------------- Mobile Menu --------------------
document.querySelector('.mobile-menu-icon').addEventListener('click', () => {
  document.querySelector('.mobile-menu').classList.toggle('show');
});

document.querySelector('.nav-currency a').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.nav-currency .dropdown-content').classList.toggle('show');
});

function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// -------------------- Slideshow + YouTube Video Control --------------------
let slideIndex = 0;
let slideTimer;
let player;
let videoPlaying = false;

const slides = document.getElementsByClassName("slide");

function showSlide(n) {
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex].style.display = "block";
}

function changeSlide(n) {
  if (videoPlaying && player) {
    player.pauseVideo();
    videoPlaying = false;
    startSlideShow();
  }
  slideIndex += n;
  showSlide(slideIndex);
}

function startSlideShow() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => {
    if (!videoPlaying) {
      slideIndex++;
      showSlide(slideIndex);
    }
  }, 5000);
}

function resetSlideTimer() {
  clearInterval(slideTimer);
  startSlideShow();
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-video', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    videoPlaying = true;
    clearInterval(slideTimer);
  }
  if (event.data == YT.PlayerState.ENDED) {
    videoPlaying = false;
    startSlideShow();
  }
}


document.addEventListener("DOMContentLoaded", () => {
  showSlide(slideIndex);
  startSlideShow();


  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});

// Pause slideshow
const slideshowContainer = document.querySelector(".slideshow-container");

if (slideshowContainer) {
  slideshowContainer.addEventListener("mouseenter", () => {
    clearInterval(slideTimer);
  });

  slideshowContainer.addEventListener("mouseleave", () => {
    if (!videoPlaying) {
      startSlideShow();
    }
  });
}



document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Stop page reload

  // Reset previous messages
  document.getElementById("emailError").textContent = "";
  document.getElementById("subjectError").textContent = "";
  document.getElementById("messageError").textContent = "";
  document.getElementById("successMessage").textContent = "";

  // Get input values
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  let isValid = true;

  // Validate Gmail
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!gmailRegex.test(email)) {
    document.getElementById("emailError").textContent = "Please enter a valid Gmail address.";
    isValid = false;
  }

  // Validate Subject
  if (subject === "") {
    document.getElementById("subjectError").textContent = "Please enter a subject.";
    isValid = false;
  }

  // Validate Message
  if (message === "") {
    document.getElementById("messageError").textContent = "Please write a message.";
    isValid = false;
  }

  // If all valid
  if (isValid) {
    document.getElementById("successMessage").textContent = "Thank you! Your message has been sent.";
    // Optional: Clear form
    document.getElementById("contactForm").reset();
  }
});
