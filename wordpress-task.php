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
    register_rest_route('marketplace/v1', '/top-stories', array(
        'methods' => 'GET',
        'callback' => 'marketplace_get_top_stories',
        'permission_callback' => '__return_true'
    ));
});

function marketplace_get_top_stories($request) {
    $recent_posts = wp_get_recent_posts(array(
        'numberposts' => 5,
        'post_status' => 'publish',
        'post_type' => 'post'
    ));

    if (empty($recent_posts)) {
        return new WP_Error('no_posts', 'No posts found', array('status' => 404));
    }

    $formatted_posts = array();

    foreach ($recent_posts as $post) {
        $word_count = str_word_count(strip_tags($post['post_content']));
        $reading_time = ceil($word_count / 200);

        $post_data = $post;
        $post_data['reading_time'] = $reading_time;

        $formatted_posts[] = $post_data;
    }

    return rest_ensure_response($formatted_posts);
}
