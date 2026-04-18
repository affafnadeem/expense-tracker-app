# 💰 Expense Tracker App

> Track your income and expenses effortlessly — a full-stack mobile app built with **React Native (Expo)** frontend and **Node.js + Express** backend, powered by **SQLite**.

![React Native](https://img.shields.io/badge/React_Native-Expo-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)
![SQLite](https://img.shields.io/badge/Database-SQLite-003B57?style=flat&logo=sqlite)
![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-blue?style=flat)
![License](https://img.shields.io/badge/license-MIT-green?style=flat)

---

## 📸 Screenshots

### 🏠 Dashboard
<img width="959" height="439" alt="Screenshot 2026-04-17 235128" src="https://github.com/user-attachments/assets/0b455756-893f-43b4-9296-c01ee7d44349" />
<img width="959" height="440" alt="Screenshot 2026-04-17 235154" src="https://github.com/user-attachments/assets/577d2807-35e1-4efd-ab9b-138fa0a97c26" />


### 📋 All Transactions
<img width="959" height="439" alt="Screenshot 2026-04-17 235216" src="https://github.com/user-attachments/assets/8c3ee6d1-8fad-432b-a3bd-2c309f78b791" />


### ➕ Add Transaction
<img width="959" height="442" alt="Screenshot 2026-04-17 235240" src="https://github.com/user-attachments/assets/b18708b2-6efc-4e17-9dc5-187e7cf4b609" />


---

## ✨ Features

- ➕ Add income and expense transactions
- ❌ Delete transactions instantly
- 📊 Live balance summary — current balance, total income & total expenses
- 📈 Recent activity chart with visual trends
- 📋 Full transaction history with category & date
- 💾 Persistent data via SQLite database
- 📱 Cross-platform — runs on iOS & Android

---

## 🛠️ Tech Stack

| Layer       | Technology                      | Version  |
|-------------|---------------------------------|----------|
| Frontend    | React Native + Expo             | Latest   |
| Navigation  | React Navigation (Bottom Tabs)  | 6.x      |
| HTTP Client | Axios                           | Latest   |
| Backend     | Node.js + Express               | Latest   |
| Database    | SQLite (via sqlite3)            | Latest   |
| Dev Tools   | Concurrently                    | 9.x      |

---

## 📁 Project Structure
expense-tracker-app/
├── backend/
│ ├── controllers.js # Route handler logic
│ ├── routes.js # API route definitions
│ ├── server.js # Express server entry point
│ └── package.json
│
├── frontend/
│ ├── components/ # Reusable UI components
│ ├── screens/ # App screens (Dashboard, Transactions, Add)
│ ├── services/
│ │ └── api.js # Axios API service layer
│ ├── App.js # Entry point + navigation
│ ├── index.js # App registration
│ └── package.json
│
├── .gitignore
├── package-lock.json
├── package.json # Root workspace scripts
└── README.md


---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v16+)
- Expo CLI installed globally
- iOS Simulator / Android Emulator **or** Expo Go app on your phone

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/expense-tracker-app.git
cd expense-tracker-app
```

### 2. Install All Dependencies

```bash
npm install
npm run install:all
```

### 3. Start the App

**Option A — Run both together (recommended):**
```bash
npm run dev
```

**Option B — Run separately:**

Backend (Terminal 1):
```bash
npm run backend
```

Frontend (Terminal 2):
```bash
npm run frontend
```

> 🚀 Backend API runs on `http://localhost:5000`

Scan the QR code with **Expo Go** on your phone, or press:
- `a` → Open on Android Emulator
- `i` → Open on iOS Simulator

---

### ⚠️ Important — Configure BASE_URL

In `frontend/services/api.js`, update `BASE_URL` to match your environment:

| Environment       | BASE_URL                          |
|-------------------|-----------------------------------|
| iOS Simulator     | `http://localhost:5000`           |
| Android Emulator  | `http://10.0.2.2:5000`            |
| Physical Device   | `http://<your-machine-ip>:5000`   |

---

## 📜 Available Scripts

| Script                 | Description                             |
|------------------------|-----------------------------------------|
| `npm run dev`          | Run frontend & backend simultaneously  |
| `npm run backend`      | Start Express backend only             |
| `npm run frontend`     | Start Expo frontend only               |
| `npm run install:all`  | Install all workspace dependencies     |

---

## 📡 API Endpoints

| Method     | Endpoint               | Description                  |
|------------|------------------------|------------------------------|
| `GET`      | `/transactions`        | Fetch all transactions       |
| `POST`     | `/transactions`        | Add a new transaction        |
| `DELETE`   | `/transactions/:id`    | Delete a transaction by ID   |
| `GET`      | `/summary`             | Get income/expense summary   |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

⭐ If you found this useful, give it a star!
