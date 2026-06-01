# Experiment 3 – Online Examination System

A full-stack online examination platform where students can take timed exams, submit answers, and view scores. Built with Node.js, Express, and Mongoose.

## 🛠 Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose ODM) + `exams_db.json` fallback

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
   cd Fsd_Codes/3_online_exam
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
3_online_exam/
├── server.js        # Express server & API routes
├── exams_db.json    # Fallback JSON exam data store
├── package.json     # Node.js project config
└── public/
    ├── index.html   # Frontend HTML (exam interface)
    ├── style.css    # Stylesheet
    └── app.js       # Frontend JavaScript (timer, submission)
```

## ✅ Features

- Dynamic exam question rendering
- Timed exam session with countdown
- Answer submission and automatic scoring
- Results displayed after submission
- REST API powered by Express + Mongoose
