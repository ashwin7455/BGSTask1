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
        image: './assets/Rectangle 64.png',
        quote: 'BGS is solving problems for us we didn\'t even know we had.',
        name: 'John Smith',
        designation: 'CEO, Tech Solutions',
        rating: 5
    },
    {
        image: './assets/Rectangle 64.png',
        quote: 'Outstanding service and professional team. They delivered beyond our expectations.',
        name: 'Sarah Johnson',
        designation: 'Director, Innovation Labs',
        rating: 5
    },
    {
        image: './assets/Rectangle 64.png',
        quote: 'Their expertise in digital transformation has been invaluable to our growth.',
        name: 'Michael Brown',
        designation: 'CTO, Digital Ventures',
        rating: 5
    }
];

let currentTestimonial = 0;
const testimonialSlider = document.querySelector('.testimonials-slider');

// Initialize Testimonials
function initTestimonials() {
    testimonials.forEach((testimonial, index) => {
        const card = createTestimonialCard(testimonial);
        testimonialSlider.appendChild(card);
    });
    updateSliderPosition();
}

// Create Testimonial Card
function createTestimonialCard(testimonial) {
    const card = document.createElement('div');
    card.className = 'testimonial-card flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4';
    
    const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
    
    card.innerHTML = `
        <div class="bg-white p-8 rounded-lg shadow-lg">
            <div class="flex items-center mb-6">
                <img src="${testimonial.image}" alt="${testimonial.name}" 
                     class="w-16 h-16 rounded-full object-cover mr-4">
                <div>
                    <h4 class="font-bold text-[#00076A]">${testimonial.name}</h4>
                    <p class="text-gray-600">${testimonial.designation}</p>
                </div>
            </div>
            <p class="text-gray-700 mb-4">${testimonial.quote}</p>
            <div class="text-yellow-400">${stars}</div>
        </div>
    `;
    
    return card;
}

// Update Slider Position
function updateSliderPosition() {
    const cardWidth = document.querySelector('.testimonial-card').offsetWidth;
    testimonialSlider.style.transform = `translateX(-${currentTestimonial * cardWidth}px)`;
}

// Navigation Functions
function nextTestimonial() {
    const maxSlides = testimonials.length - 1;
    currentTestimonial = currentTestimonial >= maxSlides ? 0 : currentTestimonial + 1;
    updateSliderPosition();
}

function prevTestimonial() {
    const maxSlides = testimonials.length - 1;
    currentTestimonial = currentTestimonial <= 0 ? maxSlides : currentTestimonial - 1;
    updateSliderPosition();
}

// Auto Rotate Testimonials
function startAutoRotate() {
    setInterval(nextTestimonial, 5000); // Rotate every 5 seconds
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollBtn = document.createElement('div');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animate elements on scroll
function initScrollAnimation() {
    const elements = document.querySelectorAll('.animate-slide-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTestimonials();
    startAutoRotate();

    // Update slider position on window resize
    window.addEventListener('resize', updateSliderPosition);

    initMobileMenu();
    initScrollToTop();
    initScrollAnimation();
});

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 