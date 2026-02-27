'use strict';

// Element toggle function
const elementToggleFunc = (elem) => elem.classList.toggle("active");

// Sidebar toggle functionality for mobile
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

// Testimonials modal functionality
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal content elements
const modalImg = document.querySelector("[data-modal-img]"); // Added this missing declaration
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Function to toggle the modal
const testimonialsModalFunc = () => {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// Add click event to all testimonial items
testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();
  });
});

// Close modal events
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Custom select functionality
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Toggle dropdown on click
select.addEventListener("click", () => elementToggleFunc(select));

// Add event to all select items
selectItems.forEach(item => {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// Filtering functionality
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = (selectedValue) => {
  filterItems.forEach(item => {
    const categories = item.dataset.category ? item.dataset.category.toLowerCase().split(' ').map(c => c.trim()) : [];
    const isTop = item.dataset.isTop === "true";

    if (selectedValue === "all") {
      item.classList.add("active");
    } else if (selectedValue === "top projects") {
      if (isTop) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    } else if (categories.includes(selectedValue)) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Add event to all filter buttons for large screen
let lastClickedBtn = filterBtn[0];

filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// Contact form validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Add event to all form input fields
formInputs.forEach(input => {
  input.addEventListener("input", function () {
    formBtn.disabled = !form.checkValidity();
  });
});

// Page navigation functionality
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav links
navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    const clickedPage = this.innerHTML.toLowerCase().trim();
    
    pages.forEach(page => {
      if (clickedPage === page.dataset.page) {
        page.classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
      }
    });

    navigationLinks.forEach(nav => {
      if (nav === this) {
        nav.classList.add("active");
      } else {
        nav.classList.remove("active");
      }
    });
  });
});



// Initialize filter with "all" to show all projects by default
  filterFunc("all");

  // Blog modal functionality
  const blogPosts = document.querySelectorAll("[data-blog-post]");
  const blogModal = document.createElement("div");
  blogModal.classList.add("blog-modal");
  blogModal.style.display = "none"; // Hidden by default

  blogModal.innerHTML = `
    <div class="blog-modal-content">
      <span class="close-modal" data-blog-close-modal>&times;</span>
      <h3 class="h3 blog-post-title" data-blog-modal-title></h3>
      <time datetime="" data-blog-modal-date></time>
      <div data-blog-modal-text></div>
    </div>
  `;
  document.body.appendChild(blogModal);

  const blogModalTitle = blogModal.querySelector("[data-blog-modal-title]");
  const blogModalDate = blogModal.querySelector("[data-blog-modal-date]");
  const blogModalText = blogModal.querySelector("[data-blog-modal-text]");
  const blogCloseModalBtn = blogModal.querySelector("[data-blog-close-modal]");

  blogPosts.forEach(post => {
    const fullContentDiv = post.querySelector("[data-blog-full-content]");

    post.addEventListener("click", () => {
      blogModalTitle.innerHTML = post.querySelector("[data-blog-title]").innerHTML;
      blogModalDate.setAttribute("datetime", post.querySelector("[data-blog-date]").getAttribute("datetime"));
      blogModalDate.innerHTML = post.querySelector("[data-blog-date]").innerHTML;
      blogModalText.innerHTML = fullContentDiv.innerHTML; // Use innerHTML to get all content including paragraphs

      blogModal.style.display = "flex"; // Show modal
    });
  });

  // Close blog modal events
  blogCloseModalBtn.addEventListener("click", () => (blogModal.style.display = "none"));
  blogModal.addEventListener("click", (event) => {
    if (event.target === blogModal) blogModal.style.display = "none";
  });


// Image Modal Variables
const imageModalContainer = document.getElementById('imageModal');
const imageModalImg = document.getElementById('modalImg');
const imageModalCloseBtn = document.getElementById('closeModal');
const imageModalPrevBtn = document.getElementById('prevBtn');
const imageModalNextBtn = document.getElementById('nextBtn');
const certificateImages = document.querySelectorAll('.certificate-image');

let currentImageIndex = 0;
const certificateImagesSrc = [];

// Store all certificate image sources
certificateImages.forEach((img, index) => {
  certificateImagesSrc.push(img.src);
  
  // Add click event to open modal
  img.addEventListener('click', () => {
    currentImageIndex = index;
    updateImageModal();
    imageModalContainer.classList.add('active');
  });
});

// Update Modal Image
function updateImageModal() {
  imageModalImg.src = certificateImagesSrc[currentImageIndex];
}

// Close Modal
imageModalCloseBtn.addEventListener('click', () => {
  imageModalContainer.classList.remove('active');
});

// Close on outside click
imageModalContainer.addEventListener('click', (e) => {
  if (e.target === imageModalContainer) {
    imageModalContainer.classList.remove('active');
  }
});

// Next Image
imageModalNextBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent modal from closing
  currentImageIndex = (currentImageIndex + 1) % certificateImagesSrc.length;
  updateImageModal();
});

// Previous Image
imageModalPrevBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent modal from closing
  currentImageIndex = (currentImageIndex - 1 + certificateImagesSrc.length) % certificateImagesSrc.length;
  updateImageModal();
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (!imageModalContainer.classList.contains('active')) return;
  
  if (e.key === 'Escape') {
    imageModalContainer.classList.remove('active');
  } else if (e.key === 'ArrowRight') {
    currentImageIndex = (currentImageIndex + 1) % certificateImagesSrc.length;
    updateImageModal();
  } else if (e.key === 'ArrowLeft') {
    currentImageIndex = (currentImageIndex - 1 + certificateImagesSrc.length) % certificateImagesSrc.length;
    updateImageModal();
  }
});

