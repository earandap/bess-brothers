// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add active state to navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNav);
    
    // Header scroll effect
    const header = document.querySelector('.header');
    const isHomePage = document.querySelector('.hero'); // Only homepage has .hero section
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (isHomePage) {
            // On homepage, header starts light and stays light
            // Remove scrolled class to keep it light
            header.classList.remove('scrolled');
        } else {
            // On other pages, add dark header when scrolling
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        lastScroll = currentScroll;
    });
    
    // Form submission handling (placeholder - will need backend integration)
    const consultationForms = document.querySelectorAll('.consultation-form');
    
    consultationForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Here you would normally send the data to your backend
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your interest! We will contact you within 24 hours to schedule your mobile showroom visit.');
            
            // Reset form
            form.reset();
        });
    });
    
    // Google Reviews Integration
    initializeGoogleReviews();
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    
    const imageOptions = {
        threshold: 0.01,
        rootMargin: '0px 0px 50px 0px'
    };
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, imageOptions);
    
    images.forEach(img => imageObserver.observe(img));
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const animateOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animateObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, animateOptions);
    
    animateElements.forEach(el => animateObserver.observe(el));
});

// Google Reviews Configuration
const GOOGLE_REVIEWS_CONFIG = {
    // Replace with your actual Google Places API key
    apiKey: 'YOUR_GOOGLE_PLACES_API_KEY',
    // Replace with your actual business Place ID
    placeId: 'YOUR_PLACE_ID', // You can find this at: https://developers.google.com/maps/documentation/places/web-service/place-id
    maxReviews: 5, // Google Places API limit
    fallbackToSampleData: true // Set to false when you have real API setup
};

// Sample reviews data (fallback when API is not configured)
const sampleReviews = [
    {
        author_name: "Sarah Johnson",
        author_url: "#",
        profile_photo_url: "https://ui-avatars.io/api/?name=Sarah+Johnson&background=7ED321&color=fff&size=128",
        rating: 5,
        relative_time_description: "2 weeks ago",
        text: "Bess Brothers Construction exceeded our expectations! Their mobile showroom made choosing new windows so easy. The installation was flawless and completed on time. Our energy bills have noticeably decreased since the replacement.",
        time: Date.now() - (14 * 24 * 60 * 60 * 1000) // 2 weeks ago
    },
    {
        author_name: "Mike Thompson",
        author_url: "#",
        profile_photo_url: "https://ui-avatars.io/api/?name=Mike+Thompson&background=0066FF&color=fff&size=128",
        rating: 5,
        relative_time_description: "1 month ago",
        text: "The mobile showroom was a game-changer! We could see exactly how the windows would look with our home's exterior. Professional service from start to finish. Highly recommend Bess Brothers!",
        time: Date.now() - (30 * 24 * 60 * 60 * 1000) // 1 month ago
    },
    {
        author_name: "Jennifer Davis",
        author_url: "#",
        profile_photo_url: "https://ui-avatars.io/api/?name=Jennifer+Davis&background=7ED321&color=fff&size=128",
        rating: 5,
        relative_time_description: "6 weeks ago",
        text: "Outstanding door installation service! The team was punctual, professional, and cleaned up perfectly after the job. Our new front door looks amazing and the security features give us great peace of mind.",
        time: Date.now() - (42 * 24 * 60 * 60 * 1000) // 6 weeks ago
    },
    {
        author_name: "Robert Chen",
        author_url: "#",
        profile_photo_url: "https://ui-avatars.io/api/?name=Robert+Chen&background=0066FF&color=fff&size=128",
        rating: 4,
        relative_time_description: "2 months ago",
        text: "Great experience with Bess Brothers. The consultation process was thorough and the mobile showroom concept is brilliant. Installation took a bit longer than expected but the quality of work is excellent.",
        time: Date.now() - (60 * 24 * 60 * 60 * 1000) // 2 months ago
    },
    {
        author_name: "Lisa Martinez",
        author_url: "#",
        profile_photo_url: "https://ui-avatars.io/api/?name=Lisa+Martinez&background=7ED321&color=fff&size=128",
        rating: 5,
        relative_time_description: "3 months ago",
        text: "Replaced all our windows and couldn't be happier! The energy efficiency improvement is noticeable and the windows look beautiful. The team was professional and courteous throughout the process.",
        time: Date.now() - (90 * 24 * 60 * 60 * 1000) // 3 months ago
    }
];

// Google Reviews Functions
async function fetchGoogleReviews() {
    if (!GOOGLE_REVIEWS_CONFIG.apiKey || GOOGLE_REVIEWS_CONFIG.apiKey === 'YOUR_GOOGLE_PLACES_API_KEY') {
        console.log('Google Places API key not configured, using sample data');
        return sampleReviews;
    }

    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_REVIEWS_CONFIG.placeId}&fields=name,rating,reviews,user_ratings_total&key=${GOOGLE_REVIEWS_CONFIG.apiKey}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();
        
        if (data.status === 'OK' && data.result.reviews) {
            return data.result.reviews;
        } else {
            throw new Error('No reviews found or API error');
        }
    } catch (error) {
        console.error('Error fetching Google reviews:', error);
        
        if (GOOGLE_REVIEWS_CONFIG.fallbackToSampleData) {
            console.log('Falling back to sample data');
            return sampleReviews;
        }
        
        return [];
    }
}

function generateStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += '<span class="star filled">★</span>';
        } else {
            starsHtml += '<span class="star unfilled">☆</span>';
        }
    }
    return starsHtml;
}

function createReviewElement(review) {
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'testimonial-card google-review animate-on-scroll';
    
    reviewDiv.innerHTML = `
        <div class="review-header">
            <div class="review-author">
                <img src="${review.profile_photo_url || 'https://ui-avatars.io/api/?name=' + encodeURIComponent(review.author_name) + '&background=7ED321&color=fff&size=128'}" 
                     alt="${review.author_name}" 
                     class="author-photo"
                     loading="lazy">
                <div class="author-info">
                    <h4 class="author-name">${review.author_name}</h4>
                    <span class="review-time">${review.relative_time_description}</span>
                </div>
            </div>
            <div class="google-logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" 
                     alt="Google" 
                     class="google-icon">
            </div>
        </div>
        <div class="stars google-stars">
            ${generateStars(review.rating)}
        </div>
        <p class="review-text">${review.text}</p>
        <a href="${review.author_url}" target="_blank" class="review-link" rel="noopener noreferrer">
            View on Google
        </a>
    `;
    
    return reviewDiv;
}

function updateBusinessRating(reviews) {
    const ratingElements = document.querySelectorAll('.business-rating');
    const ratingCountElements = document.querySelectorAll('.rating-count');
    
    if (reviews.length > 0) {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = (totalRating / reviews.length).toFixed(1);
        
        ratingElements.forEach(element => {
            element.textContent = averageRating;
        });
        
        ratingCountElements.forEach(element => {
            element.textContent = `(${reviews.length} reviews)`;
        });
    }
}

async function displayGoogleReviews() {
    try {
        const reviews = await fetchGoogleReviews();
        const testimonialsGrid = document.querySelector('.testimonials-grid');
        
        if (!testimonialsGrid) {
            console.error('Testimonials grid not found');
            return;
        }

        // Clear existing testimonials
        testimonialsGrid.innerHTML = '';
        
        // Add Google Reviews header
        const reviewsSection = document.querySelector('.testimonials');
        if (reviewsSection) {
            const sectionTitle = reviewsSection.querySelector('.section-title');
            if (sectionTitle) {
                sectionTitle.innerHTML = `
                    What Our Customers Say 
                    <div class="google-reviews-badge">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" 
                             alt="Google" class="google-badge-icon">
                        <span class="business-rating">4.8</span>
                        <div class="google-stars-small">
                            ${generateStars(5)}
                        </div>
                        <span class="rating-count">(${reviews.length} reviews)</span>
                    </div>
                `;
            }
        }
        
        // Display reviews
        reviews.forEach((review, index) => {
            const reviewElement = createReviewElement(review);
            reviewElement.style.animationDelay = `${index * 0.1}s`;
            testimonialsGrid.appendChild(reviewElement);
        });
        
        // Update business rating displays
        updateBusinessRating(reviews);
        
        // Re-initialize scroll animations for new elements
        const newAnimateElements = document.querySelectorAll('.google-review.animate-on-scroll');
        const animateOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const animateObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, animateOptions);
        
        newAnimateElements.forEach(el => animateObserver.observe(el));
        
        console.log(`Successfully loaded ${reviews.length} Google reviews`);
        
    } catch (error) {
        console.error('Error displaying Google reviews:', error);
    }
}

async function initializeGoogleReviews() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', displayGoogleReviews);
    } else {
        await displayGoogleReviews();
    }
}