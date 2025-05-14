# Backend Boilerplate

This is a Flask API boilerplate with user management, Firebase authentication, and Azure Cosmos DB integration.

## Features

- **Authentication**: Firebase authentication integration with JWT token validation
- **User Management**: Create, read, update, and delete user profiles
- **Database**: Azure Cosmos DB integration for data storage
- **Structured Project**: Well-organized project structure with clear separation of concerns
- **Logging**: Comprehensive logging system
- **Monitoring**: Azure Application Insights integration for monitoring in production

## Getting Started

1. Clone this repository
2. Create a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file with the following variables:
   ```
   FLASK_ENV=development
   COSMOS_ENDPOINT=your-cosmos-endpoint
   COSMOS_KEY=your-cosmos-key
   COSMOS_DATABASE=your-cosmos-database
   FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"your-project-id",...}
   APPLICATIONINSIGHTS_CONNECTION_STRING=your-connection-string
   ```
5. Run the development server:
   ```bash
   ./start.sh
   # Or on Windows: python app.py
   ```
6. The API will be available at http://localhost:5000/api

## Project Structure

- `app.py`: Main application entry point
- `apis/`: API routes and endpoint handlers
- `services/`: External service integrations (Cosmos DB, etc.)

## API Endpoints

### Authentication

All endpoints except `/api/ping` require authentication via Firebase JWT token in the Authorization header:
```
Authorization: Bearer your-firebase-token
```

### User Management

- `POST /api/users`: Create a new user (automatically called after Firebase authentication)
- `GET /api/users`: Get the current user's profile
- `PUT /api/users`: Update the current user's profile (set profileCompleted)
- `DELETE /api/users`: Delete the current user's account

### Health Check

- `GET /api/ping`: Simple health check endpoint (returns 200 OK)

## Cosmos DB Setup

1. Create an Azure Cosmos DB account
2. Create a database named as specified in your `.env` file
3. Create a container named `Users` with partition key `/id` 