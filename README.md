# Monflow 🎵

A modern web application for music discovery inspired by Tinder, built with Next.js and the Spotify API. Swipe to discover new tracks based on your musical preferences.

## ✨ Features

- **Musical Swipe System**: Discover new tracks by swiping like Tinder
- **Spotify Integration**: Search and play tracks via Spotify Web API
- **Smart Recommendations**: Algorithm based on your musical taste
- **Playlist Creation**: Automatically create playlists from your liked tracks
- **Modern Interface**: Responsive design with smooth animations

## 🚀 Technologies

- **Frontend**: Next.js 13, React 18, TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Sass, Bulma, Framer Motion
- **API**: Spotify Web API
- **Testing**: Jest, React Testing Library
- **Architecture**: Clean Architecture (Domain/Application/Infrastructure)

## 🏗️ Architecture

The project follows hexagonal architecture principles:

```
src/
├── domain/          # Business entities and rules
├── application/     # Application services
├── api/            # Use cases and interfaces
├── infra/          # Technical implementations
└── presentation/   # User interface
```

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/monflow.git
cd monflow
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

4. Add your Spotify credentials to `.env.local`

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 🐳 Docker

To run the application with Docker:

```bash
docker build -t monflow .
docker run -p 3000:3000 monflow
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 Available Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - ESLint linting
- `npm test` - Jest testing

## 📖 About

This project is a personal showcase demonstrating modern full-stack development practices with clean architecture principles. Built as a learning exercise exploring React, Next.js, and the Spotify API.

## 📄 License

MIT