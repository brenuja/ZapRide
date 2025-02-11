# 🚀 ZapRide – Ride-Hailing App  

ZapRide is a modern ride-hailing app designed to connect passengers with captains efficiently. It offers a smooth user experience with real-time ride updates, secure authentication, and intuitive UI/UX.

## 📌 Features  

### 🖥️ Frontend (React.js)  
- 🚗 Ride booking interface  
- 📍 Display captain details (name, vehicle info, and location)  
- 💳 Payment integration (Cash mode for now)  
- 🔐 Authentication & user session management  
- 🎨 Responsive UI with Tailwind CSS  

### ⚙️ Backend (Node.js, Express, MongoDB)  
- 🛠️ User and captain authentication (JWT-based)  
- 🚖 Ride management system  
- 🗺️ Location tracking  
- 🔐 Secure password hashing with bcrypt  
- 📡 WebSocket integration for real-time updates (future scope)  

## 🏗️ Tech Stack  

| Frontend | Backend | Database | Other |
|----------|--------|----------|-------|
| React.js | Node.js | MongoDB | Tailwind CSS |
| React Router | Express.js | Mongoose | JWT |
| Axios | bcrypt | | WebSockets (future) |

## 🔧 Installation & Setup  

### Clone the repository  
```bash
git clone https://github.com/yourusername/zapride.git
cd zapride
```

### Frontend Setup  
```bash
cd frontend
npm install
npm start
```

### Backend Setup  
```bash
cd backend
npm install
node server.js
```

## 📜 API Endpoints (Backend)  
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register a new user/captain |
| POST | `/auth/login` | Authenticate user & return JWT |
| GET | `/ride/:id` | Fetch ride details |
| POST | `/ride/book` | Book a new ride |

## 📌 Future Enhancements  
- 🌍 Real-time captain tracking  
- 💰 Online payment integration  
- 📊 Ride history & analytics  

🚀 **ZapRide – Making Rides Smarter!**  


