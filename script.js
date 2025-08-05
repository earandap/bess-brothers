// Consultation booking modal HTML
const consultationModalHTML = `
<div id="consultationModal" class="modal">
    <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h2>Schedule Your Free Consultation</h2>
        <p class="modal-subtitle">Let us bring our mobile showroom to you!</p>

        <form class="consultation-form modal-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="modal-first-name">First Name *</label>
                    <input type="text" id="modal-first-name" name="first-name" required>
                </div>
                <div class="form-group">
                    <label for="modal-last-name">Last Name *</label>
                    <input type="text" id="modal-last-name" name="last-name" required>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="modal-email">Email *</label>
                    <input type="email" id="modal-email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="modal-phone">Phone *</label>
                    <input type="tel" id="modal-phone" name="phone" required>
                </div>
            </div>

            <div class="form-group full-width">
                <label for="modal-service">Service Interested In *</label>
                <select id="modal-service" name="service" required>
                    <option value="">Select a service</option>
                    <option value="windows">Windows Replacement</option>
                    <option value="doors">Doors Replacement</option>
                    <option value="both">Both Windows & Doors</option>
                </select>
            </div>

            <div class="form-group full-width">
                <label for="modal-message">Additional Notes</label>
                <textarea id="modal-message" name="message" rows="3" placeholder="Tell us about your project or any special requirements..."></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-large btn-block">Schedule Consultation</button>
        </form>
    </div>
</div>
`;

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



    // Form submission handling with EmailJS
    const consultationForms = document.querySelectorAll('.consultation-form');

    consultationForms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get submit button and disable it
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Validate form
            if (!validateForm(data)) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                return;
            }

            try {
                // Send email using EmailJS
                await sendEmail(data);

                // Show success message
                showNotification('success', 'Thank you for your message! We will contact you within 24 hours.');

                // Reset form
                form.reset();
            } catch (error) {
                console.error('Error sending email:', error);
                showNotification('error', 'There was an error sending your message. Please try again or call us directly.');
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
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

    // Initialize consultation booking modal
    initializeConsultationModal();

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

// Form validation function
function validateForm(data) {
    // Check if it's a consultation form (has service field) or contact form (has message field)
    const isConsultationForm = data.hasOwnProperty('service');
    
    let requiredFields;
    if (isConsultationForm) {
        // Consultation form requires: name, email, phone, service
        requiredFields = ['first-name', 'last-name', 'email', 'phone', 'service'];
    } else {
        // Contact form requires: name, email, phone, message
        requiredFields = ['first-name', 'last-name', 'email', 'phone', 'message'];
    }

    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification('error', `Please fill in all required fields.`);
            return false;
        }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('error', 'Please enter a valid email address.');
        return false;
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\d\s()+-]+$/;
    if (!phoneRegex.test(data.phone)) {
        showNotification('error', 'Please enter a valid phone number.');
        return false;
    }

    return true;
}

// Send email using EmailJS
async function sendEmail(data) {
    // EmailJS Configuration
    const SERVICE_ID = 'Bess Brothers Contact'; // Your EmailJS service ID
    const TEMPLATE_ID = 'template_5rqiihp'; // Your EmailJS template ID
    const PUBLIC_KEY = '3Xvt4Jn3FfWA82tjr'; // Your EmailJS public key

    // Convert service value to label
    const serviceLabels = {
        'windows': 'Windows Replacement',
        'doors': 'Doors Replacement',
        'both': 'Both Windows & Doors'
    };
    
    const serviceLabel = serviceLabels[data.service] || data.service || 'Not specified';

    // Format the data for EmailJS
    const templateParams = {
        from_name: `${data['first-name']} ${data['last-name']}`,
        from_email: data.email,
        phone: data.phone,
        service: serviceLabel,
        message: data.message,
        to_email: 'business@bessbrothers.com'
    };

    // All EmailJS configuration is now complete - send the email
    console.log('Sending email with EmailJS...');

    // Send email via EmailJS
    return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
}

// Show notification function
function showNotification(type, message) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Initialize consultation booking modal
function initializeConsultationModal() {
    // Add modal HTML to body if it doesn't exist
    if (!document.getElementById('consultationModal')) {
        document.body.insertAdjacentHTML('beforeend', consultationModalHTML);
    }

    const modal = document.getElementById('consultationModal');
    const closeBtn = modal.querySelector('.modal-close');

    // Close modal when clicking X
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Handle all consultation buttons
    const consultationButtons = document.querySelectorAll(
        'a[href="#book"], ' +
        'a[href="services.html#book"], ' +
        'a.btn-primary:not([type="submit"])[href*="consultation" i], ' +
        'a.btn-primary:not([type="submit"])[href*="#book"]'
    );

    consultationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openConsultationModal();
        });
    });

    // Handle modal form submission
    const modalForm = modal.querySelector('.modal-form');
    if (modalForm) {
        modalForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = modalForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Scheduling...';

            const formData = new FormData(modalForm);
            const data = Object.fromEntries(formData);

            // Convert service value to label for the message
            const serviceLabels = {
                'windows': 'Windows Replacement',
                'doors': 'Doors Replacement',
                'both': 'Both Windows & Doors'
            };
            const serviceLabel = serviceLabels[data.service] || data.service;
            
            // Format consultation request message
            if (data.message) {
                data.message = `Consultation Request - Service: ${serviceLabel}. Additional Notes: ${data.message}`;
            } else {
                data.message = `Consultation Request - Service: ${serviceLabel}. No additional notes provided.`;
            }

            if (!validateForm(data)) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                return;
            }

            try {
                await sendEmail(data);
                showNotification('success', 'Consultation scheduled! We\'ll contact you within 24 hours to confirm.');
                modalForm.reset();
                setTimeout(() => {
                    modal.classList.remove('show');
                }, 2000);
            } catch (error) {
                console.error('Error scheduling consultation:', error);
                showNotification('error', 'There was an error scheduling your consultation. Please try again or call us directly.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
}

// Open consultation modal
function openConsultationModal() {
    const modal = document.getElementById('consultationModal');
    if (modal) {
        modal.classList.add('show');
    }
}
