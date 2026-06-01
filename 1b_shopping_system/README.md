# Experiment 1b – Online Shopping System

A full-stack shopping system with a Node.js/Express backend, file-based JSON database, and a dynamic front-end for browsing products, managing a cart, and placing orders.

## 🛠 Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** JSON file (`database.json`)

## 📋 Prerequisites

Make sure the following are installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

Verify installation:
```bash
node -v
npm -v
```

## 🚀 How to Run

1. Open a terminal and navigate to the project folder:
   ```bash
   cd Fsd_Codes/1b_shopping_system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
1b_shopping_system/
├── server.js        # Express server & API routes
├── database.json    # File-based product/order database
├── package.json     # Node.js project config
└── public/
    ├── index.html   # Frontend HTML
    ├── style.css    # Stylesheet
    └── app.js       # Frontend JavaScript (AJAX calls)
```

## ✅ Features

- View product listings fetched from the server
- Add/remove items from cart
- Place orders stored in `database.json`
- RESTful API with Express.js
