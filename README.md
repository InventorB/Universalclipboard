# Universal Clipboard API (Node + SQLite)

A lightweight Express + SQLite service that lets you quickly send URLs between your devices — no login or setup needed. Perfect for “send this tab to my phone” or “share between computers” moments.
### SECURITY NOTICE: INTENDED FOR LAN/VPN USAGE ONLY. RUN IN AN ENVIROMENT YOU TRUST!

---

## 🚀 Quick Start

1. **Clone and install:**
   ```bash
   git clone <your-repo-url>
   cd <your-repo>
   npm install
   node server.js
   ```

2. The server will print something like:
   ```
   Server running at http://0.0.0.0:3000/
   ```

   > Tip: `0.0.0.0` works for all interfaces. Use `127.0.0.1` for local-only access.

---

## 🧩 How It Works

Each time you call `PUT /api/submiturl`, your current page (or any URL) gets stored in a simple SQLite database with an optional “device” tag. Then, you can visit `GET /api/latesturl` to jump straight to the newest link.

---

## 🔌 API Endpoints

### `PUT /api/submiturl`

Saves a new URL into the database.

**Headers**
- `url` *(required)* — the URL to save  
- `device` *(optional)* — your device name; if omitted, your IP address is used

**Responses**
- `201 Created` — success  
- `400 Bad Request` — missing or empty URL

**Example (curl)**
```bash
curl -X PUT 'http://localhost:3000/api/submiturl'   -H 'device: Laptop'   -H 'url: https://example.com'
```

---

### `GET /api/latesturl`

Redirects your browser to the most recently saved URL.

- `301` redirect to the newest link
- `404` if nothing’s been stored yet

---

## 🔖 Easy Bookmarklet

Save this as a browser bookmark. Click it on any page to send that page’s URL to your API:

```javascript
javascript:(()=>{const ep='http://localhost:3000/api/submiturl';const d=(localStorage.getItem('bm_device')??prompt('Device name (optional):',''))||'';try{localStorage.setItem('bm_device',d);}catch{}fetch(ep,{method:'PUT',headers:{'device':d,'url':location.href}}).then(r=>alert(`Saved! (${r.status})`)).catch(e=>alert('Error: '+e));})();
```

> Change `ep` to your deployed API address. Remove the alerts if you prefer it silent.

---

## 🧠 Database Info

The app uses [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) for speed and simplicity.

| Field | Type | Description |
|-------|------|--------------|
| ID | INTEGER | Auto-increment primary key |
| DEVICE | TEXT | Device name or IP |
| URL | TEXT | The stored link |

---

## ⚙️ Configuration

You can set your own IP or port in `server.js`:

```js
const hostname = '0.0.0.0'; // Replace with your desired IP address
const port = 3000;
```

---

## 🌐 CORS

CORS is enabled by default:

```js
const cors = require('cors');
app.use(cors());
```

If you only want to allow certain domains:
```js
app.use(cors({ origin: 'https://your-site.com' }));
```

Made by Braden Wagner.
