<?php
/**
 * TASK 2 — WordPress REST API Endpoint
 * 
 * Your Task:
 * Write the PHP code to register a custom REST API endpoint:
 * GET /wp-json/marketplace/v1/top-stories
 * 
 * Requirements:
 * 1. The endpoint should be public (__return_true).
 * 2. It should return the 5 most recent 'post' types.
 * 3. Each post in the response should include a 'reading_time' field.
 * 4. 'reading_time' calculation: (word count of post_content) / 200, rounded up.
 * 
 * Register your route and callback function below:
 */

add_action('rest_api_init', function () {
    // Implement register_rest_route here...
});
