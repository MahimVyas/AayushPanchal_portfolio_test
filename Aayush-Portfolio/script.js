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
    if (selectedValue === "all" || selectedValue === item.dataset.category.toLowerCase()) {
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
    pages.forEach(page => {
      if (this.innerHTML.toLowerCase() === page.dataset.page) {
        page.classList.add("active");
        this.classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navigationLinks.forEach(nav => nav.classList.remove("active"));
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const certificateImages = document.querySelectorAll(".certificate-image");
  const modal = document.createElement("div");

  // Ensure the modal is hidden by default
  modal.classList.add("certificate-modal");
  modal.style.display = "none";

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <img src="" alt="Certificate">
    </div>
  `;

  document.body.appendChild(modal);

  const modalImg = modal.querySelector("img");
  const closeModal = modal.querySelector(".close-modal");

  // Open modal when a certificate is clicked
  certificateImages.forEach(img => {
    img.addEventListener("click", function () {
      modal.style.display = "flex"; // Show modal only on click
      modalImg.src = this.src;
    });
  });

  // Close modal events
  closeModal.addEventListener("click", () => (modal.style.display = "none"));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.style.display = "none";
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

