# Experiment 2 – Student Performance Monitoring System

A full-stack web application to monitor and manage student academic performance records using Node.js, Express, and Mongoose (MongoDB).

## 🛠 Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose ODM) + `performance_db.json` fallback

## 📋 Prerequisites

Make sure the following are installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally on port 27017)

Verify installation:
```bash
node -v
npm -v
mongod --version
```

## 🚀 How to Run

1. Open a terminal and navigate to the project folder:
   ```bash
   cd Fsd_Codes/2_student_monitoring
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make sure MongoDB is running:
   ```bash
   mongod
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
2_student_monitoring/
├── server.js              # Express server & API routes
├── performance_db.json    # Fallback JSON data store
├── package.json           # Node.js project config
└── public/
    ├── index.html         # Frontend HTML
    ├── style.css          # Stylesheet
    └── app.js             # Frontend JavaScript (AJAX calls)
```

## ✅ Features

- Add and view student performance records
- Marks and grade tracking per subject
- REST API with Express + Mongoose
- MongoDB-backed persistent storage
