# Expense Tracker App

A full working Expense Tracker app with:
- React Native (Expo) frontend
- Node.js + Express backend
- SQLite database

## Structure
- `frontend/` React Native mobile app
- `backend/` Express API with SQLite

## Run locally

### 1) Install dependencies
```bash
npm install
npm run install:all
```

### 2) Start backend
```bash
npm run backend
```

### 3) Start frontend
In another terminal:
```bash
npm run frontend
```

## Backend API
- `GET /transactions`
- `POST /transactions`
- `DELETE /transactions/:id`
- `GET /summary`

## Notes
- Frontend API base URL is set to `http://localhost:5000` in `frontend/services/api.js`.
- For real Android devices, replace `localhost` with your machine's LAN IP.
