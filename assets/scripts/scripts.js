const tooltipTriggerList = document.querySelectorAll('[data-bs-tootip-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// SKRYPT DO WYLICZANIA WYSOKOSCI SLIDERA NA GLOWNEJ
function adjustPhotoSliderHeight() {
  // Check if on index.html
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
      const headerHeight = document.getElementById('header')?.offsetHeight || 0;
      const navbarHeight = document.getElementById('navbarMain')?.offsetHeight || 0;
      const totalHeight = headerHeight + navbarHeight;

      const photoSlider = document.getElementById('photoSlider');
      if (photoSlider) {
          photoSlider.style.height = `calc(100vh - ${totalHeight}px)`;
      }
  }
}

// Adjust height on page load
document.addEventListener('DOMContentLoaded', adjustPhotoSliderHeight);

// Adjust height on window resize
window.addEventListener('resize', adjustPhotoSliderHeight);


// SKRYPT DO DODAWANIA NAZWY PODSTRONY DO MENU W WERSJI ZMINIMALIZOWANEJ
// Detect the current page name from the URL, including subpages
const navLinks = document.querySelectorAll('.nav-link');
const currentPath = window.location.pathname.split('/').pop() || 'index.html'; // Default to 'index.html'
const navbarBrand = document.getElementById('navbarBrand');

navLinks.forEach(link => {
  // If the link href matches the current path, mark it as active and set the brand text
  if (link.getAttribute('href').endsWith(currentPath)) {
    // link.classList.add('active'); CHYBA NIEPOTRZEBNE A PSUJE ROZWIJANE MENU
    navbarBrand.textContent = link.textContent; // Set brand to the active link's text
  }
});

// SKRYPT DO SEARCH'a
// Handle search form submission
function handleSearch(event) {
  event.preventDefault(); // Prevent the form from reloading the page
  const query = document.getElementById("searchInput").value;
  // Redirect to the search_result.html page with the query parameter
  window.location.href = `search_result.html?q=${encodeURIComponent(
      query
  )}`;
  }