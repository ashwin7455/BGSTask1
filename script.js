// Mobile Menu Toggle
function initMobileMenu() {
    const menuButton = document.querySelector('nav button');
    const mobileMenu = document.querySelector('nav .md\\:hidden.py-4');

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
}

// Testimonials Data
const testimonials = [
    {
      image: "./assests/Rectangle.png",
      text: "“BGS is solving problems for us we didn’t even know we had.”",
      name: "Rohan Kumar,",
      designation: "CTO, FutureTech",
      stars: 5
    },
    {
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      text: "“Excellent service and support, they helped us scale seamlessly.”",
      name: "Ayesha Malik,",
      designation: "Product Head, NovaApps",
      stars: 4
    },
    {
      image: "https://randomuser.me/api/portraits/men/65.jpg",
      text: "“Truly a partner in innovation, not just a service provider.”",
      name: "Ankit Singh,",
      designation: "Founder, DevCraft",
      stars: 5
    }
  ];

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

  document.getElementById("prevBtn").addEventListener("click", () => {
    current = (current - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(current);
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    current = (current + 1) % testimonials.length;
    updateTestimonial(current);
  });

  // Initialize first testimonial
  updateTestimonial(current);