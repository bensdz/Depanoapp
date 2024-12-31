# Depano 🚗

<img src="https://i.imghippo.com/files/Euj6855MtI.png" alt="" border="0">

A full-stack mobile application built with React Native, demonstrating ride-hailing functionality similar to Uber. Features include live location tracking, ride booking, payments via Stripe, and authentication.

## Tech Stack

- React Native
- Expo
- PostgreSQL
- Stripe
- Google Maps
- Zustand
- Clerk
- TailwindCSS

## Key Features

- Complete onboarding flow with email/password and Google OAuth authentication 
- Live location tracking with Google Maps integration
- Ride search with Google Places autocomplete
- Real-time ride selection and booking
- Secure payments through Stripe
- Ride history and user profiles
- Cross-platform support (iOS & Android)

## Setup Instructions

### Prerequisites
- Node.js
- npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bensdz/Depanoapp.git
cd uber
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create `.env` file with the following:
```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=
EXPO_PUBLIC_PLACES_API_KEY=
EXPO_PUBLIC_DIRECTIONS_API_KEY=
EXPO_PUBLIC_GEOAPIFY_API_KEY=
```

4. Start the development server:
```bash
npx expo start
```

## Project Structure

```
├── components/
│   ├── CustomButton/
│   ├── InputField/
│   └── DriverCard.tsx
├── lib/
│   ├── fetch.ts
│   ├── map.ts
│   └── utils.ts
├── screens/
│   ├── book-ride/
│   └── (tabs)/
└── store/
    └── index.ts
```

## Database Schema

The application uses PostgreSQL with the following main tables:
- Users
- Drivers
- Rides

## API Integration

The app integrates with several external services:
- Clerk for authentication
- Google Maps for location services
- Stripe for payment processing
- Geoapify for mapping features

## Additional Resources

- [Expo NativeWind Setup](https://docs.expo.dev/guides/using-tailwind/)
- [Clerk Expo Quickstart](https://clerk.com/docs/quickstarts/expo)
