# Raahi 

Raahi is a mentorship platform built for Smart India Hackathon (SIH). Students can discover mentors, book one-on-one sessions, join video calls, and take part in community forums. Mentors get a dashboard to manage their availability, bookings and testimonials.

## Features

- **Mentor discovery**: browse and filter mentors (`/mentors/explore`) and watch short video snippets (`/mentors/reels`)
- **Slot booking**: pick a time from a mentor's weekly availability (`/mentors/book/:mentorId`)
- **Video calling**: peer-to-peer WebRTC calls with Socket.IO signalling (`/room/:roomId`)
- **Forums**: create threads and discuss (`/forum`)
- **Chatbot**: an in-app assistant (`/chatbot`)
- **Mentor dashboard**: bookings, availability, calendar with `.ics` upload, analytics, testimonials and profile editing (`/dashboard/*`)

## Tech stack

| Part | Stack |
| --- | --- |
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, React Router, React Query, Recharts, Framer Motion |
| Signalling server | Node.js, Socket.IO |
| REST API | Hosted separately (see `baseURL` in `frontend/src/App.tsx`) |

## Repository layout

```
.
├── backend/    # Socket.IO signalling server for video calls
├── frontend/   # React + Vite single-page app
├── netlify.toml
└── vercel.json
```

## Getting started

Prerequisites: Node.js 18+ and npm.

### Frontend

```bash
cd frontend
npm install
npm run dev        # starts Vite on http://localhost:5173
```

Other scripts:

```bash
npm run build      # production build into frontend/dist
npm run preview    # serve the production build locally
npm run lint       # ESLint
npm run typecheck  # TypeScript type check
```

### Signalling server

```bash
cd backend
npm install
npm start          # listens on port 8000
```

The frontend connects to the deployed signalling server by default (see `frontend/src/context/SocketProvider.tsx`). Point it at `http://localhost:8000` to test video calls locally.

## Deployment

The frontend can be deployed to Netlify (`netlify.toml`) or Vercel (`vercel.json`). Both build from the `frontend/` directory and serve `frontend/dist`.
