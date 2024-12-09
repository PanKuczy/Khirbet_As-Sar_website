const tooltipTriggerList = document.querySelectorAll('[data-bs-tootip-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


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

//SKRYPT DO ZOOMOWANIA I PANOWANIA OBRAZOW

const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('imageModalLabel');
const zoomContainer = document.querySelector('.zoom-container');
let panzoomInstance;

// Load the clicked image into the modal and initialize Panzoom
document.querySelectorAll('.clickable-image').forEach(image => {
  image.addEventListener('click', () => {
    const imageUrl = image.getAttribute('data-bs-image');
    modalImage.src = imageUrl;
    const imageAlt = image.getAttribute('alt');

    modalImage.src = imageUrl;
    modalTitle.textContent = imageAlt;

    // Re-initialize Panzoom for each new image
    if (panzoomInstance) panzoomInstance.destroy(); // Clean up previous instance
    panzoomInstance = Panzoom(modalImage, {
      maxScale: 3,
      minScale: 1,
      contain: 'outside',
      cursor: 'grab',
      step: 0.33,
      animate: true,
      duration: 300,
      easing: "ease-in-out"
    });

    // Enable zooming with mouse wheel
    zoomContainer.addEventListener('wheel', panzoomInstance.zoomWithWheel);

  });
});

document.querySelectorAll('.clickable-badge').forEach(button => {
  button.addEventListener('click', () => {
    const imageUrl = button.getAttribute('data-bs-image');
    modalImage.src = imageUrl;
    const imageAlt = button.getAttribute('alt');

    modalImage.src = imageUrl;
    modalTitle.textContent = imageAlt;

    // Re-initialize Panzoom for each new image
    if (panzoomInstance) panzoomInstance.destroy(); // Clean up previous instance
    panzoomInstance = Panzoom(modalImage, {
      maxScale: 3,
      minScale: 1,
      contain: 'outside',
      cursor: 'grab',
      step: 0.33,
      animate: true,
      duration: 300,
      easing: "ease-in-out"
    });

    // Enable zooming with mouse wheel
    zoomContainer.addEventListener('wheel', panzoomInstance.zoomWithWheel);

  });
});

// Track mouse state to handle panning correctly
let isDragging = false;

// Start panning on mouse down
zoomContainer.addEventListener('mousedown', (e) => {
  if (panzoomInstance) {
    isDragging = true;
    modalImage.style.cursor = 'grabbing';
    panzoomInstance.pause(); // Temporarily pause animations for smooth drag
  }
});

// Handle panning on mouse move, only if the mouse button is pressed
zoomContainer.addEventListener('mousemove', (e) => {
  if (isDragging && panzoomInstance) {
    panzoomInstance.pan(e.movementX, e.movementY); // Pan by mouse movement delta
  }
});

// Stop panning on mouse up
document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    modalImage.style.cursor = 'grab';
    if (panzoomInstance) panzoomInstance.resume(); // Resume Panzoom animations
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