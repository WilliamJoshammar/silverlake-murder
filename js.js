// -------------------- Currency Dropdown --------------------
function toggleCurrencyDropdown(event) {
  event.preventDefault();
  const dropdown = document.getElementById("currency-dropdown");
  dropdown.classList.toggle("show");
}

document.addEventListener("click", function (e) {
  const currencyBtn = document.getElementById("current-currency");
  const dropdown = document.getElementById("currency-dropdown");

  if (currencyBtn && dropdown && !currencyBtn.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.remove("show");
  }
});

function setCurrency(code, flag) {
  const current = document.getElementById("current-currency");
  if (current) {
    current.textContent = `${code} ${flag}`;
    document.getElementById("currency-dropdown").classList.remove("show");
  }
}

// -------------------- Mobile Menu --------------------
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
  const navCurrencyLink = document.querySelector('.nav-currency a');
  
  if (mobileMenuIcon) {
    mobileMenuIcon.addEventListener('click', () => {
      document.querySelector('.mobile-menu').classList.toggle('show');
    });
  }

  if (navCurrencyLink) {
    navCurrencyLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.nav-currency .dropdown-content').classList.toggle('show');
    });
  }
});

function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu) {
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  }
}

// -------------------- Slideshow + YouTube Video Control --------------------
let slideIndex = 0;
let slideTimer;
let player;
let videoPlaying = false;

function initSlideshow() {
  const slides = document.getElementsByClassName("slide");
  if (slides.length === 0) return;

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

  window.changeSlide = changeSlide;

  showSlide(slideIndex);
  startSlideShow();

  // Pause slideshow on hover
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
}

// -------------------- Contact Form --------------------
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    document.getElementById("emailError").textContent = "";
    document.getElementById("subjectError").textContent = "";
    document.getElementById("messageError").textContent = "";
    document.getElementById("successMessage").textContent = "";

    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    const emailRegex = /^[a-öA-Ö0-9._%+-]+@[a-öA-Ö0-9.-]+\.[a-öA-Ö]{2,}$/;
    if (!emailRegex.test(email)) {
      document.getElementById("emailError").textContent = "Please enter a valid email address.";
      isValid = false;
    }

    // Subject validation
    if (subject === "") {
      document.getElementById("subjectError").textContent = "Please enter a subject.";
      isValid = false;
    }

    // Message validation
    if (message === "") {
      document.getElementById("messageError").textContent = "Please write a message.";
      isValid = false;
    }

    // Success
    if (isValid) {
      document.getElementById("successMessage").textContent = "Thank you! Your message has been sent.";
      document.getElementById("contactForm").reset();
    }
  });
}

// -------------------- Countdown --------------------
function initCountdown() {

  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');
  const messageElement = document.getElementById('message');
  
  if (!daysElement || !hoursElement || !minutesElement || !secondsElement || !messageElement) {
    console.log('Countdown elements not found on this page');
    return;
  }

  function updateCountdown() {
    try {

      const now = new Date();
      
      const targetDate = new Date(2025, 5, 27, 0, 0, 0); // Du kan ändra Date så kan du se hur countdownen förändras på hemsidan när det är 24h kvar och när det är 0
      
      const timeDifference = targetDate.getTime() - now.getTime();

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        daysElement.textContent = String(days).padStart(2, '0');
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');

        const secondsUnit = document.getElementById('seconds-unit');
        const countdownContainer = document.querySelector('.countdown-container');

        if (days === 0 && hours < 24) {
          if (secondsUnit) secondsUnit.style.display = 'block';
          if (countdownContainer) countdownContainer.classList.add('final-countdown');
          messageElement.textContent = 'FINAL COUNTDOWN! Less than 24 hours remaining!';
        } else {
          if (secondsUnit) secondsUnit.style.display = 'none';
          if (countdownContainer) countdownContainer.classList.remove('final-countdown');
          
          if (days > 1) {
            messageElement.textContent = `${days} days until June 27th arrives...`;
          } else if (days === 1) {
            messageElement.textContent = 'Only 1 day left! The anticipation builds...';
          } else {
            messageElement.textContent = 'Today is the day! Less than 24 hours to go!';
          }
        }
      } else {

        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        messageElement.textContent = 'Blackout has arrived, stream on all platforms!';
        
        const countdownTitle = document.querySelector('.countdown-title');
        const countdownContainer = document.querySelector('.countdown-container');
        
        if (countdownTitle) countdownTitle.textContent = 'JUNE 27 IS HERE!';
        if (countdownContainer) {
          countdownContainer.style.background = 'linear-gradient(135deg, #006600, #009900)';
        }
      }
      
    } catch (error) {
      console.error('Countdown error:', error);
      messageElement.textContent = 'Error loading countdown. Please refresh the page.';
    }
  }

  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);

  const timeUnits = document.querySelectorAll('.time-unit');
  timeUnits.forEach(unit => {
    unit.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    unit.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
  });

  console.log('Countdown initialized successfully');
}

// -------------------- Initialize Everything --------------------
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing components...');
  

  if (document.getElementsByClassName("slide").length > 0) {
    initSlideshow();
  }
  

  if (document.getElementById('contactForm')) {
    initContactForm();
  }
  
  initCountdown();
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
  });
} else {

  setTimeout(initCountdown, 100);
}
