# Task 4 — System Design: Scalable Waitlist

Please write your 300–500 word architecture plan here.

## Requirements:
- Scalability
- Queue management/Rate limiting
- Fairness (order)
- Notification (background workers)

## System Architecture Plan

### 1. High-Level Overview
Our system centers on decoupling the immediate API response from the heavy processing using an asynchronous event-driven architecture. Users sending a "join waitlist" request will hit an API gateway, which places their position securely into a high-throughput queue instead of a traditional blocking database save. 

### 2. Scalability & High Availability
To ensure scalability, the core service should be deployed across multiple instances behind a load balancer (e.g., AWS ALB). 
- **Database:** A NoSQL database like DynamoDB or a carefully partitioned PostgreSQL cluster is recommended for the central persistence layer. This allows reading and updating waitlist statuses globally at scale.
- **Caching Layer:** Redis should be used to temporarily store a user's status and total waitlist count to quickly serve "Check my position" API requests without bombarding the main database.

### 3. Queue Management & Rate Limiting
To handle traffic spikes (e.g., product launches), the API gateway must enforce strict rate limiting per IP or User ID using a Token Bucket algorithm backed by Redis.
When a valid request passes rate limiting, it is instantly pushed onto a fast message broker like Apache Kafka or RabbitMQ. This acts as a shock absorber. The user receives a `202 Accepted` immediately, providing a seamless UX even when millions are trying to sign up.

### 4. Fairness (Order Preservation) 
Fairness means strictly adhering to First-In-First-Out (FIFO). Systems like Kafka partitions or Amazon SQS FIFO queues naturally guarantee strict ordering. 
Each waitlist submission is timestamped accurately at the API gateway layer. Background consumers read off this exact queue in chronological order, sequentially assigning the user an official "rank" in the database.

### 5. Notifications (Background Workers)
Once a spot opens up, a CRON job or an event trigger fires off a "Process Next Batch" command. 
- **Worker Nodes:** A fleet of background workers (e.g., AWS Lambda, Celery workers) pull the next N users from the database.
- **Asynchronous Delivery:** These workers formulate an email/SMS and place it into a separate dead-letter-queue-enabled notification queue (e.g., SQS) to decouple message delivery from user state updates.
- **Third-Party Services:** Services like SendGrid or Twilio consume this queue to handle the actual delivery. If an email fails, the DLQ allows us to safely retry without losing the user's position.
