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

function validateEmail() {
  const emailInput = document.getElementById("email").value;
  const errorMsg = document.getElementById("errorMsg");

  if (!emailInput.includes("@")) {
    errorMsg.textContent = "Email must contain an '@' symbol.";
    return false;
  }

  errorMsg.textContent = "";
  alert("Message sent successfully!");
  return true;
}
