# Candidate Support System

AI-powered platform to automate coding homework review, resource recommendations, and WhatsApp delivery.

## Quick Start

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
# Fill in your API keys in .env
npm install
npm run dev
```

Backend runs on http://localhost:4000

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173

---

## Environment Variables (backend/.env)

| Key | Description |
|---|---|
| `OPENAI_API_KEY` | OpenAI API key (gpt-4o) |
| `SERP_API_KEY` | SerpAPI key for article search |
| `YOUTUBE_API_KEY` | YouTube Data API v3 key |
| `TWILIO_ACCOUNT_SID` | Twilio Account SID |
| `TWILIO_AUTH_TOKEN` | Twilio Auth Token |
| `TWILIO_WHATSAPP_FROM` | Twilio WhatsApp sandbox number (e.g. +14155238886) |

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/review` | Submit code for AI review |
| GET | `/api/articles?concept=` | Fetch curated articles |
| GET | `/api/videos?concept=` | Fetch YouTube videos |
| POST | `/api/whatsapp/send` | Send message to WhatsApp |
| GET | `/api/history` | List all submissions |
| GET | `/api/history/:id` | Get submission detail |
| DELETE | `/api/history/:id` | Delete a submission |

---

## Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS, Framer Motion
- **Backend**: Node.js, Express
- **AI**: OpenAI gpt-4o
- **Database**: SQLite (better-sqlite3, auto-created)
- **APIs**: SerpAPI, YouTube Data API v3, Twilio WhatsApp
