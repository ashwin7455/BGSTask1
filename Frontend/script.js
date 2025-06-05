// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuIcon = document.getElementById("menuIcon");
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle("hidden");

    // Switch icon
    if (isMenuOpen) {
      menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />`;
    } else {
      menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />`;
    }
  }

  mobileMenuBtn.addEventListener("click", toggleMenu);

  // Optional: Close menu on outside click
  document.addEventListener("click", function (event) {
    if (
      !mobileMenu.contains(event.target) &&
      !mobileMenuBtn.contains(event.target) &&
      isMenuOpen
    ) {
      toggleMenu();
    }
  });

  // Optional: Close menu on window resize to desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768 && isMenuOpen) {
      toggleMenu();
    }
  });
});

// Testimonials Data
const testimonials = [
  {
    image: "./assets/dummy.png",
    text: "“Customer centric approach. Innovative solutions tailored as per the requirement of the customers. Great experience!”",
    name: "Shubham Khampariya",
    designation: "CTO, FutureTech",
    stars: 5,
  },
  {
    image: "./assets/dummy.png",
    text: "“Excellent service and support, they helped us scale seamlessly.”",
    name: "Ayesha Malik",
    designation: "Product Head, NovaApps",
    stars: 4,
  },
  {
    image: "./assets/dummy.png",
    text: "“Truly a partner in innovation, not just a service provider.”",
    name: "Ankit Singh",
    designation: "Founder, DevCraft",
    stars: 5,
  },
];

function initTestimonials() {
  let current = 0;

  const image = document.getElementById("testimonialImage");
  const text = document.getElementById("testimonialText");
  const name = document.getElementById("testimonialName");
  const designation = document.getElementById("testimonialDesignation");
  const stars = document.getElementById("testimonialStars");

  function updateTestimonial(index) {
    const t = testimonials[index];
    image.src = t.image;
    text.textContent = t.text;
    name.textContent = t.name;
    designation.textContent = t.designation;
    stars.textContent = "⭐".repeat(t.stars);
  }

  function showNext() {
    current = (current + 1) % testimonials.length;
    updateTestimonial(current);
  }

  function showPrev() {
    current = (current - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(current);
  }

  document.getElementById("nextBtn").addEventListener("click", showNext);
  document.getElementById("prevBtn").addEventListener("click", showPrev);

  updateTestimonial(current);

  // Auto play every 5 seconds
  setInterval(showNext, 1500);
}

document.addEventListener("DOMContentLoaded", initTestimonials);

// Scroll to top button functionality
const scrollBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY > 100) {
    // Show button
    scrollBtn.classList.remove("opacity-0", "pointer-events-none");
    scrollBtn.classList.add("opacity-100");
  } else {
    // Hide button
    scrollBtn.classList.add("opacity-0", "pointer-events-none");
    scrollBtn.classList.remove("opacity-100");
  }
});

/*counter*/

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll("[data-target]");

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const duration = 8000; // total duration in ms
    const frameRate = 100; // frames per second
    const totalSteps = Math.round((duration / 1000) * frameRate); // e.g., 120 steps for 2s
    const increment = target / totalSteps;

    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current >= target) {
        counter.innerText = target.toLocaleString();
      } else {
        counter.innerText = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  });
});
//  popup

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("crmModal").classList.remove("hidden");
});

function closeModal() {
  document.getElementById("crmModal").classList.add("hidden");
}

// landing corosal

// Example slides data

// Partner logos (replace with your own as needed)
const carousel = document.getElementById("carousel");
const logos = carousel.children;
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let auto;

// Slide Function
function slideNext() {
  carousel.appendChild(logos[0]);
}

function slidePrev() {
  carousel.insertBefore(logos[logos.length - 1], logos[0]);
}

nextBtn.addEventListener("click", () => {
  slideNext();
  resetInterval();
});

prevBtn.addEventListener("click", () => {
  slidePrev();
  resetInterval();
});

function startAutoSlide() {
  auto = setInterval(slideNext, 3000);
}

function resetInterval() {
  clearInterval(autoSlide);
  startAutoSlide();
}

// Start autoplay
startAutoSlide();
