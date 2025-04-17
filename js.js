// Toggle the currency dropdown
function toggleCurrencyDropdown(event) {
    event.preventDefault();
    const dropdown = document.getElementById("currency-dropdown");
    dropdown.classList.toggle("show");
  }
  
  // Close currency dropdown if clicked outside (for both mobile and desktop)
  document.addEventListener("click", function (e) {
    const currencyBtn = document.getElementById("current-currency");
    const dropdown = document.getElementById("currency-dropdown");
  
    // Close dropdown if the click is outside of the dropdown or the currency button
    if (!currencyBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  });
  
  // Optional: Update currency text
  function setCurrency(code, flag) {
    const current = document.getElementById("current-currency");
    current.textContent = `${code} ${flag}`;
    document.getElementById("currency-dropdown").classList.remove("show");
  }
  
  
  




function toggleMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  }
  