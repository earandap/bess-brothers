/**
 * Backend Proxy for Google Reviews - Production Example
 * 
 * This Node.js/Express server acts as a proxy between your frontend
 * and the Google Places API to avoid CORS issues and keep API keys secure.
 * 
 * SETUP INSTRUCTIONS:
 * 1. npm install express cors dotenv
 * 2. Create .env file with: GOOGLE_PLACES_API_KEY=your_api_key_here
 * 3. Run: node backend-proxy-example.js
 * 4. Update frontend to call: http://localhost:3001/api/reviews?placeId=YOUR_PLACE_ID
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for your frontend domain
app.use(cors({
    origin: ['http://localhost:8082', 'https://yourdomain.com'], // Add your actual domain
    credentials: true
}));

app.use(express.json());

/**
 * GET /api/reviews
 * Fetches Google Reviews for a given Place ID
 * 
 * Query Parameters:
 * - placeId: Google Places Place ID (required)
 * - maxReviews: Number of reviews to return (default: 5)
 */
app.get('/api/reviews', async (req, res) => {
    try {
        const { placeId, maxReviews = 5 } = req.query;
        
        // Validate required parameters
        if (!placeId) {
            return res.status(400).json({
                error: 'Missing required parameter: placeId'
            });
        }
        
        const apiKey = process.env.GOOGLE_PLACES_API_KEY;
        if (!apiKey) {
            return res.status(500).json({
                error: 'Google Places API key not configured'
            });
        }
        
        // Build Google Places API URL
        const fields = 'name,rating,reviews,user_ratings_total,formatted_address';
        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`;
        
        // Fetch from Google Places API
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Check for API errors
        if (data.status !== 'OK') {
            return res.status(400).json({
                error: `Google Places API error: ${data.status}`,
                message: data.error_message || 'Unknown error'
            });
        }
        
        // Extract and format review data
        const placeData = data.result;
        const reviews = placeData.reviews || [];
        
        // Limit number of reviews
        const limitedReviews = reviews.slice(0, parseInt(maxReviews));
        
        // Format response
        const formattedResponse = {
            businessInfo: {
                name: placeData.name,
                rating: placeData.rating,
                totalReviews: placeData.user_ratings_total,
                address: placeData.formatted_address
            },
            reviews: limitedReviews.map(review => ({
                author_name: review.author_name,
                author_url: review.author_url,
                profile_photo_url: review.profile_photo_url,
                rating: review.rating,
                relative_time_description: review.relative_time_description,
                text: review.text,
                time: review.time,
                language: review.language || 'en'
            })),
            meta: {
                totalFetched: limitedReviews.length,
                requestedMax: parseInt(maxReviews),
                fetchedAt: new Date().toISOString()
            }
        };
        
        res.json(formattedResponse);
        
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to fetch reviews'
        });
    }
});

/**
 * GET /api/reviews/business-info
 * Fetches basic business information without reviews
 */
app.get('/api/reviews/business-info', async (req, res) => {
    try {
        const { placeId } = req.query;
        
        if (!placeId) {
            return res.status(400).json({
                error: 'Missing required parameter: placeId'
            });
        }
        
        const apiKey = process.env.GOOGLE_PLACES_API_KEY;
        const fields = 'name,rating,user_ratings_total,formatted_address';
        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.status !== 'OK') {
            return res.status(400).json({
                error: `Google Places API error: ${data.status}`
            });
        }
        
        const placeData = data.result;
        res.json({
            name: placeData.name,
            rating: placeData.rating,
            totalReviews: placeData.user_ratings_total,
            address: placeData.formatted_address
        });
        
    } catch (error) {
        console.error('Error fetching business info:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'Google Reviews Proxy'
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: 'Something went wrong'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not found',
        message: 'Endpoint not found'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Google Reviews Proxy Server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
    console.log(`📝 Reviews endpoint: http://localhost:${PORT}/api/reviews?placeId=YOUR_PLACE_ID`);
    
    if (!process.env.GOOGLE_PLACES_API_KEY) {
        console.warn('⚠️  WARNING: GOOGLE_PLACES_API_KEY not found in environment variables');
        console.log('   Create a .env file with: GOOGLE_PLACES_API_KEY=your_api_key_here');
    }
});

/**
 * FRONTEND INTEGRATION EXAMPLE:
 * 
 * // Update your script.js fetchGoogleReviews function:
 * async function fetchGoogleReviews() {
 *     try {
 *         const response = await fetch(`http://localhost:3001/api/reviews?placeId=${GOOGLE_REVIEWS_CONFIG.placeId}`);
 *         const data = await response.json();
 *         
 *         if (!response.ok) {
 *             throw new Error(data.error || 'Failed to fetch reviews');
 *         }
 *         
 *         return data.reviews;
 *     } catch (error) {
 *         console.error('Error fetching Google reviews:', error);
 *         return sampleReviews; // Fallback to sample data
 *     }
 * }
 */

/**
 * DEPLOYMENT NOTES:
 * 
 * 1. For production, deploy this to a cloud service (Vercel, Netlify, Heroku, etc.)
 * 2. Update CORS origins to match your actual domain
 * 3. Set environment variables on your hosting platform
 * 4. Consider rate limiting to prevent API quota exhaustion
 * 5. Add authentication if needed for your use case
 * 6. Monitor API usage and costs
 */

module.exports = app; 