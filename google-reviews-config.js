/**
 * Google Reviews Configuration for Bess Brothers Construction
 * 
 * This file contains the configuration for integrating Google Reviews
 * into your website. Follow the steps below to set up real Google Reviews.
 */

// ============================================================================
// STEP 1: Get a Google Places API Key
// ============================================================================
// 1. Go to Google Cloud Console: https://console.cloud.google.com/
// 2. Create a new project or select existing project
// 3. Enable the "Places API" 
// 4. Create credentials (API Key)
// 5. Restrict the API key to your domain for security
// 6. Replace 'YOUR_GOOGLE_PLACES_API_KEY' below with your actual API key

// ============================================================================
// STEP 2: Find Your Business Place ID
// ============================================================================
// 1. Use Google's Place ID Finder: https://developers.google.com/maps/documentation/places/web-service/place-id
// 2. Search for "Bess Brothers Construction" or your business address
// 3. Copy the Place ID and replace 'YOUR_PLACE_ID' below

// ============================================================================
// STEP 3: Configure CORS (if needed)
// ============================================================================
// Note: Direct API calls from browser may face CORS issues
// For production, consider using a backend proxy or Google's official widgets

export const GOOGLE_REVIEWS_CONFIG = {
    // Replace with your actual Google Places API key
    apiKey: 'YOUR_GOOGLE_PLACES_API_KEY',
    
    // Replace with your actual business Place ID
    placeId: 'YOUR_PLACE_ID',
    
    // Google Places API returns maximum 5 reviews
    maxReviews: 5,
    
    // Set to false when you have real API configured
    fallbackToSampleData: true,
    
    // API endpoint (don't change unless using proxy)
    apiEndpoint: 'https://maps.googleapis.com/maps/api/place/details/json',
    
    // Fields to request from Google Places API
    fields: 'name,rating,reviews,user_ratings_total,formatted_address'
};

// ============================================================================
// PRODUCTION SETUP RECOMMENDATIONS
// ============================================================================

/**
 * For production deployment, consider these options:
 * 
 * OPTION 1: Backend Proxy (Recommended)
 * - Create a backend endpoint that calls Google Places API
 * - This avoids CORS issues and keeps your API key secure
 * - Example endpoint: /api/reviews
 * 
 * OPTION 2: Google Maps JavaScript API with Places Library
 * - More complex but official Google solution
 * - Requires loading Google Maps JavaScript API
 * - Better for complex integrations
 * 
 * OPTION 3: Third-party services
 * - Services like Featurable.com or similar
 * - Easier setup but may have usage limits
 * - Good for small businesses
 */

// ============================================================================
// SAMPLE DATA CONFIGURATION
// ============================================================================
// This sample data will be used when fallbackToSampleData is true
// You can customize these reviews to match your business

export const SAMPLE_REVIEWS_CONFIG = {
    businessName: "Bess Brothers Construction",
    averageRating: 4.8,
    totalReviews: 47,
    
    // Customize these sample reviews
    reviews: [
        {
            author_name: "Sarah Johnson",
            rating: 5,
            relative_time_description: "2 weeks ago",
            text: "Bess Brothers Construction exceeded our expectations! Their mobile showroom made choosing new windows so easy. The installation was flawless and completed on time. Our energy bills have noticeably decreased since the replacement.",
            author_url: "https://www.google.com/maps/contrib/",
            profile_photo_url: null // Will auto-generate avatar
        },
        {
            author_name: "Mike Thompson", 
            rating: 5,
            relative_time_description: "1 month ago",
            text: "The mobile showroom was a game-changer! We could see exactly how the windows would look with our home's exterior. Professional service from start to finish. Highly recommend Bess Brothers!",
            author_url: "https://www.google.com/maps/contrib/",
            profile_photo_url: null
        },
        {
            author_name: "Jennifer Davis",
            rating: 5, 
            relative_time_description: "6 weeks ago",
            text: "Outstanding door installation service! The team was punctual, professional, and cleaned up perfectly after the job. Our new front door looks amazing and the security features give us great peace of mind.",
            author_url: "https://www.google.com/maps/contrib/",
            profile_photo_url: null
        },
        {
            author_name: "Robert Chen",
            rating: 4,
            relative_time_description: "2 months ago", 
            text: "Great experience with Bess Brothers. The consultation process was thorough and the mobile showroom concept is brilliant. Installation took a bit longer than expected but the quality of work is excellent.",
            author_url: "https://www.google.com/maps/contrib/",
            profile_photo_url: null
        },
        {
            author_name: "Lisa Martinez",
            rating: 5,
            relative_time_description: "3 months ago",
            text: "Replaced all our windows and couldn't be happier! The energy efficiency improvement is noticeable and the windows look beautiful. The team was professional and courteous throughout the process.",
            author_url: "https://www.google.com/maps/contrib/", 
            profile_photo_url: null
        }
    ]
};

// ============================================================================
// TESTING CONFIGURATION
// ============================================================================
export const TESTING_CONFIG = {
    // Enable debug logging
    enableDebugLogs: true,
    
    // Simulate API delays for testing
    simulateApiDelay: false,
    
    // Test with different numbers of reviews
    testReviewCounts: [1, 3, 5],
    
    // Test error scenarios
    testErrorScenarios: false
};

// ============================================================================
// QUICK SETUP GUIDE
// ============================================================================
/**
 * IMMEDIATE SETUP (Using Sample Data):
 * 1. The website already works with sample reviews
 * 2. No additional setup required for demonstration
 * 
 * LIVE GOOGLE REVIEWS SETUP:
 * 1. Get Google Places API key (see STEP 1 above)
 * 2. Find your business Place ID (see STEP 2 above)  
 * 3. Update apiKey and placeId in GOOGLE_REVIEWS_CONFIG
 * 4. Set fallbackToSampleData to false
 * 5. Test on your domain (may need CORS setup)
 * 
 * TROUBLESHOOTING:
 * - Check browser console for errors
 * - Verify API key has Places API enabled
 * - Check API key restrictions
 * - Consider backend proxy for production
 */ 