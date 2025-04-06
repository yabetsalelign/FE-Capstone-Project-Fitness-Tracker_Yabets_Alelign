# 🏋️‍♂️ MoveMate – Fitness Tracker

Welcome to **MoveMate**, a responsive and user-friendly fitness tracking app built with React. This project is part of the Frontend Capstone for my ALX-Front-end program, demonstrating full-stack frontend development skills, dynamic UI rendering, state management, and API integration.

---

## 🔥 Features

### ✅ Authentication
- Sign up and login using a minimal email/password system.
- Zustand-based global state management for handling auth across components.

### 🧍 User Dashboard
- Personalized dashboard showing calories burned, distance traveled, and steps taken.
- Users can submit their daily activity only once per day.

### 💪 Workout Management
- Browse detailed exercises pulled from the WGER API.
- Add workouts to your upcoming list.
- Mark workouts as “Finished” and move them to the history with custom calories burned.
- Recent workouts are displayed with duration and date.

### 🗓️ Upcoming & Recent Workouts
- View, finish, and track your workouts in real-time.
- Workouts stored using Zustand’s persistent state.

### 🌗 Dark Mode
- Toggle dark mode across the entire app for better accessibility and comfort.

---

## 🛠️ Technologies Used

- **React** with functional components & hooks  
- **Zustand** for global state management  
- **TailwindCSS** for styling  
- **Formik** for forms and input handling  
- **WGER API** for real-time exercise data  
- **React Router DOM** for page navigation  
- **LocalStorage** to persist daily activity tracking

---

## 📦 Installation

```bash
git clone (https://github.com/yabetsalelign/FE-Capstone-Project-Fitness-Tracker_Yabets_Alelign.git)
cd movemate
npm install
npm start
