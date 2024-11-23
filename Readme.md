Event Logging System
Overview
The Event Logging System is a scalable backend application designed for distributed applications to log, query, and manage events in a tamper-proof manner. The system uses cryptographic hashing to ensure the integrity of the logs, supports querying with filters, and handles a high volume of events efficiently with MongoDB's indexing and sharding.

Features
Event Logging API

Create event logs with metadata:
Event Type
Timestamp
Source Application ID
Data Payload (JSON)
Generate cryptographic hashes for each log, referencing the previous log hash.
Tamper-Proof Design

Ensures the integrity of logs using cryptographic hashing.
Logs are linked in a chain-like structure for data consistency.
Search and Query

Query logs by timestamp range, event type, and source application.
Includes pagination for large datasets.
Scalability

Utilizes MongoDB's sharding and indexing for high performance.
Demonstrates horizontal scalability to handle increasing workloads.
Error Handling and Validation

Validates incoming data against a defined schema using Joi.
Robust error handling for invalid inputs and edge cases.
Technologies Used
Backend Framework: Express.js
Database: MongoDB
Validation: Joi
Hashing: Crypto
Environment Management: dotenv
Middleware: Custom error handling
Setup Instructions
Prerequisites
Node.js installed (v16 or above recommended).
MongoDB installed locally or a cloud MongoDB instance.
npm (Node Package Manager).
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-repo/event-logging-system.git
cd event-logging-system
Install dependencies:

bash
Copy code
npm install
Set up environment variables: Create a .env file in the root directory and add:

plaintext
Copy code
MONGO_URI=mongodb://localhost:27017/event_logs
PORT=5000
Start the MongoDB server:

bash
Copy code
mongod
Start the application:

For development:
bash
Copy code
npm run dev
For production:
bash
Copy code
npm start
API Endpoints
Base URL
bash
Copy code
http://localhost:5000/api/logs
1. Create Event Log
Endpoint: POST /api/logs
Description: Create a new event log.
Request Body (JSON):

json
Copy code
{
  "eventType": "LOGIN",
  "timestamp": "2024-11-23T10:00:00.000Z",
  "sourceAppId": "App123",
  "dataPayload": {
    "userId": "user_001",
    "action": "User logged in"
  }
}
Response:

json
Copy code
{
  "message": "Log created successfully",
  "log": {
    "_id": "64b56d9f6fa0e127e8dbe245",
    "eventType": "LOGIN",
    "timestamp": "2024-11-23T10:00:00.000Z",
    "sourceAppId": "App123",
    "dataPayload": {
      "userId": "user_001",
      "action": "User logged in"
    },
    "previousHash": null,
    "currentHash": "e2cfd79d93b..."
  }
}
2. Query Event Logs
Endpoint: GET /api/logs
Description: Query event logs with filters and pagination.
Query Parameters:

from (optional): Start of the timestamp range (ISO format).
to (optional): End of the timestamp range (ISO format).
eventType (optional): Type of event to filter (e.g., LOGIN).
sourceAppId (optional): ID of the source application.
page (optional): Page number (default: 1).
limit (optional): Number of logs per page (default: 10).
Example Request:

bash
Copy code
GET /api/logs?eventType=LOGIN&page=1&limit=5
Response:

json
Copy code
{
  "logs": [
    {
      "_id": "64b56d9f6fa0e127e8dbe245",
      "eventType": "LOGIN",
      "timestamp": "2024-11-23T10:00:00.000Z",
      "sourceAppId": "App123",
      "dataPayload": {
        "userId": "user_001",
        "action": "User logged in"
      },
      "previousHash": null,
      "currentHash": "e2cfd79d93b..."
    }
  ],
  "totalCount": 1
}
Folder Structure
controllers/
Contains route handlers for the API.

services/
Implements business logic and database operations.

models/
Defines the MongoDB schemas for event logs.

routes/
Contains the API route definitions.

utils/
Provides utility functions like hash generation.

middleware/
Custom error handling logic.

config/
Database configuration.

Error Handling
Errors are captured and returned in a structured format:

json
Copy code
{
  "message": "Internal Server Error",
  "error": "Error message details..."
}
Scalability
MongoDB Sharding: MongoDB's sharding capabilities can be leveraged for horizontal scaling in production environments.
Indexing: Ensure frequently queried fields (like timestamp and eventType) are indexed for fast retrieval.
Load Balancing: Use tools like Nginx or AWS Elastic Load Balancer for distributing traffic.
Future Enhancements
Real-Time Streaming: Use WebSocket or Server-Sent Events (SSE) for real-time updates to clients.
Dashboard: Build a lightweight frontend to visualize logs and detect inconsistencies.
Decentralization: Implement a leader election or consistency mechanism for decentralized logging.
Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request with your changes.

License
This project is licensed under the MIT License.

Author
Alok Abhigyan
GitHub: Abhigyan1997

