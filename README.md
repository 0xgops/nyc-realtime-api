# NYC Realtime API 🗽

Live REST API for real-time New York City data:  
alternate side parking rules, weather alerts, subway status, and street closures — all in one unified JSON response.

Built with:
- Next.js App Router
- TypeScript
- NYC Open Data + NOAA

---

## 📡 Endpoints

| Endpoint                | Purpose                               |
|------------------------|----------------------------------------|
| `/api/parking/today`   | Alternate side parking status          |
| `/api/weather/alerts`  | Active weather alerts from NOAA        |
| `/api/mta/status`      | Subway service status (fallback-ready) |
| `/api/streets/closures`| Street closures + permits              |
| `/api/vibe/today`      | Aggregated city “mood” API             |

---

## 🧪 Local Dev

```bash
npm install
npm run dev