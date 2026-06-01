# Experiment 10 – Course Manager & Dynamic Color Panel (React)

A React-based web app combining a course registration CRUD dashboard with a dynamic background color changer. Uses React CDN (no build tools needed).

## 🛠 Tech Stack

- HTML5
- CSS3
- React 18 (loaded via CDN — **no installation needed**)
- Babel Standalone (for JSX in browser — loaded via CDN)

## 📋 Prerequisites

No installations required. Only a modern web browser with an internet connection is needed (React & Babel are loaded from CDN).

## 🚀 How to Run

1. Open the project folder:
   ```
   Fsd_Codes/10_course_registration_and_color/
   ```

2. Double-click `index.html` to open it directly in your browser.

   **OR** right-click `index.html` → *Open with* → Choose your browser (Chrome, Firefox, Edge, etc.)

> ⚠️ **Internet Required:** React 18 and Babel are loaded from CDN. Make sure you have an active internet connection.

## 📁 Project Structure

```
10_course_registration_and_color/
├── index.html    # Main HTML (React app entry point + JSX logic)
└── style.css     # Stylesheet for panels, table, badges
```

## ✅ Features

- **Course Registration (Part A):**
  - Add new courses (Code, Title, Instructor, Status)
  - Edit existing course entries inline
  - Delete courses with confirmation prompt
  - Live course table with Active/Inactive status badges
  - Toast notification on every add/update/delete action

- **Dynamic Background Color Panel (Part B):**
  - Click color swatches to instantly change the page background
  - Toast notification shows the color name and hex code applied
  - Built using React `useState` and DOM manipulation
