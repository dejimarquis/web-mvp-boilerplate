# Boilerplate Project

This repository contains a full-stack boilerplate with a Next.js frontend and Flask backend, designed to kickstart your web application development.

## Features

- **Authentication**: Firebase authentication with email/password and Google sign-in
- **User Management**: Profile management, account settings
- **Protected Routes**: Dashboard and profile pages are protected
- **Responsive UI**: Built with Chakra UI for a beautiful and responsive user experience
- **API Integration**: Backend API with user management endpoints
- **Database**: Azure Cosmos DB integration for data storage

## Project Structure

- `frontend/`: Next.js frontend application
- `backend/`: Flask backend API

## Getting Started

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your Firebase configuration
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file with your configuration
5. Start the development server:
   ```bash
   ./start.sh
   # Or on Windows: python app.py
   ```
6. The API will be available at http://localhost:5000/api

## Customization

This boilerplate is designed to be easily customizable for your specific needs. You can:

1. Rename the application and update branding
2. Add additional pages and features
3. Extend the API with new endpoints
4. Customize the UI with your own design system

## Deployment

### Frontend

The frontend can be deployed to Vercel, Netlify, or any other Next.js-compatible hosting service.

### Backend

The backend can be deployed to Azure App Service, Heroku, or any other Python-compatible hosting service.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 