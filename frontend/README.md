# Frontend Boilerplate

This is a Next.js boilerplate with authentication, user management, and a beautiful UI using Chakra UI.

## Features

- **Authentication**: Firebase authentication with email/password and Google sign-in
- **User Management**: Profile management, account settings
- **Protected Routes**: Dashboard and profile pages are protected
- **Responsive UI**: Built with Chakra UI for a beautiful and responsive user experience
- **TypeScript**: Type-safe code with TypeScript

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `src/app`: Next.js app router pages
- `src/components`: Reusable React components
- `src/lib`: Utilities, context providers, and API services
- `src/types`: TypeScript type definitions

## Available Routes

- `/`: Landing page
- `/login`: Login page
- `/signup`: Signup page
- `/dashboard`: Protected dashboard page
- `/profile`: User profile management
- `/complete-profile`: Complete profile information after signup

## Backend Integration

This frontend is designed to work with the included backend boilerplate. Make sure to start the backend server before using the frontend. 