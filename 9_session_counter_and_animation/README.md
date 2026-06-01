# Experiment 9 – Session Counter & Box Animation

A static webpage demonstrating two JavaScript concepts: `sessionStorage`-based user login counter/logger, and a CSS keyframe animation with play/pause controls.

## 🛠 Tech Stack

- HTML5
- CSS3 (keyframe animations)
- Vanilla JavaScript (`sessionStorage` API)

## 📋 Prerequisites

No installations required. Only a modern web browser is needed.

## 🚀 How to Run

1. Open the project folder:
   ```
   Fsd_Codes/9_session_counter_and_animation/
   ```

2. Double-click `index.html` to open it directly in your browser.

   **OR** right-click `index.html` → *Open with* → Choose your browser (Chrome, Firefox, Edge, etc.)

> 💡 **Tip:** The session counter data persists only within the same browser tab session. Closing the tab resets the count.

## 📁 Project Structure

```
9_session_counter_and_animation/
├── index.html    # Main HTML (session logger + animation panel)
└── style.css     # Stylesheet (animation keyframes, table styles)
```

## ✅ Features

- **Session User Logger:**
  - Simulate user logins by entering a username
  - Tracks and displays login count using `sessionStorage`
  - Live log table showing timestamp and username for each session
  - Reset button to clear all session data

- **Box Animation Control:**
  - CSS `@keyframes` animated box sliding across a track
  - Pause / Resume button to control the animation play state
