# ShifoTop — Next.js demo

Minimal Next.js + TypeScript + Tailwind demo for a medical marketplace UI (Uzum-like cards), TTS and booking.

Quick setup:

1. Install dependencies
```bash
cd word
npm install
```

2. Create env file (optional, for Telegram notifications)
```bash
cp .env.local.example .env.local
# then fill TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID
```

3. Run dev server
```bash
npm run dev
# open http://localhost:3000
```

Notes:
- The project skeleton and demo components are in `src/components` and `app/page.tsx`.
- Tailwind is configured; component styles use Tailwind.
- Booking POSTs to `/api/book` which will forward to Telegram when env vars are set.
# doctorim
