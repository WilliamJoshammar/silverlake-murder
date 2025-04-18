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
  




// -------------------- Slideshow --------------------
let slideIndex = 0;
let slideTimer;

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
  slideIndex += n;
  showSlide(slideIndex);
  resetSlideTimer();
}

function resetSlideTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => {
    changeSlide(1);
  }, 5000);
}

// Initial setup
document.addEventListener("DOMContentLoaded", () => {
  showSlide(slideIndex);
  resetSlideTimer();
});
