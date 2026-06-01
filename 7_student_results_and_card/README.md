# Experiment 7 – Student Results Portal (React + Flexbox Cards)

A dynamic student results management system built with React (loaded via CDN). Students can be added with their marks and filtered by pass/fail status. Results are displayed as responsive Flexbox cards.

## 🛠 Tech Stack

- HTML5
- CSS3 (Flexbox layout)
- React 18 (loaded via CDN — **no installation needed**)
- Babel Standalone (for JSX in browser — loaded via CDN)

## 📋 Prerequisites

No installations required. Only a modern web browser with an internet connection is needed (React & Babel are loaded from CDN).

## 🚀 How to Run

1. Open the project folder:
   ```
   Fsd_Codes/7_student_results_and_card/
   ```

2. Double-click `index.html` to open it directly in your browser.

   **OR** right-click `index.html` → *Open with* → Choose your browser (Chrome, Firefox, Edge, etc.)

> ⚠️ **Internet Required:** React 18 and Babel are loaded from CDN. Make sure you have an active internet connection.

## 📁 Project Structure

```
7_student_results_and_card/
├── index.html    # Main HTML (React app entry point + JSX logic)
└── style.css     # Stylesheet for cards and layout
```

## ✅ Features

- Add student records (name, roll number, Math & Physics marks)
- Auto-calculates average and determines Pass/Fail
- Filter students by: All / Passed Only / Failed Only
- Responsive Flexbox card grid display
- Built entirely with React functional components and hooks (`useState`, `useMemo`)
