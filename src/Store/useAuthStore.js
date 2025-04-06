import { create } from 'zustand';

// Helper to load/save to localStorage
const loadFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (err) {
    console.error("Error loading from localStorage", err);
    return null;
  }
};

const saveToLocalStorage = (key, state) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (err) {
    console.error("Error saving to localStorage", err);
  }
};

export const useAuthStore = create((set, get) => ({
  // State
  users: loadFromLocalStorage('users') || [],
  isAuthenticated: loadFromLocalStorage('isAuthenticated') || false,
  currentUser: loadFromLocalStorage('currentUser') || null,
  darkMode: loadFromLocalStorage('darkMode') || false,
  notificationsEnabled: loadFromLocalStorage('notificationsEnabled') || true,
  dailyStats: loadFromLocalStorage('dailyStats') || { calories: 0, distance: 0, steps: 0 },
  upcomingWorkouts: loadFromLocalStorage('upcomingWorkouts') || [],
  recentWorkouts: loadFromLocalStorage('recentWorkouts') || [],
  caloriesBurned: loadFromLocalStorage('caloriesBurned') || 0,
  distanceTraveled: loadFromLocalStorage('distanceTraveled') || 0,
  stepsTaken: loadFromLocalStorage('stepsTaken') || 0,

  // Permanent token
  token: '3d891829e955118775c40e27d4f907caef9df718',

  // Methods

  setDailyStats: (calories, distance, steps) => {
    set({ dailyStats: { calories, distance, steps } });
    saveToLocalStorage('dailyStats', { calories, distance, steps });
  },

  updateCaloriesBurned: (calories) => {
    set((state) => {
      const newCalories = state.caloriesBurned + parseInt(calories, 10);
      saveToLocalStorage('caloriesBurned', newCalories);
      return { caloriesBurned: newCalories };
    });
  },
  updateDistanceTraveled: (distance) => {
    set((state) => {
      const newDistance = state.distanceTraveled + parseFloat(distance);
      saveToLocalStorage('distanceTraveled', newDistance);
      return { distanceTraveled: newDistance };
    });
  },
  updateStepsTaken: (steps) => {
    set((state) => {
      const newSteps = state.stepsTaken + parseInt(steps, 10);
      saveToLocalStorage('stepsTaken', newSteps);
      return { stepsTaken: newSteps };
    });
  },


  signup: (name, email, password) => {
    const users = get().users || [];
    const exists = users.some(user => user.email === email);

    if (!exists) {
      const newUser = { name, email, password };
      const updatedUsers = [...users, newUser];
      set({ users: updatedUsers, currentUser: newUser, isAuthenticated: true });
      saveToLocalStorage('users', updatedUsers);
      saveToLocalStorage('currentUser', newUser);
      saveToLocalStorage('isAuthenticated', true);
      return true;
    } else {
      return false;
    }
  },

  login: (email, password) => {
    const users = get().users;
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      set({ isAuthenticated: true, currentUser: user });
      saveToLocalStorage('isAuthenticated', true);
      saveToLocalStorage('currentUser', user);
      return true;
    } else {
      return false;
    }
  },

  logout: () => {
    set({ isAuthenticated: false, currentUser: null });
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  },

  toggleDarkMode: () => {
    const newDarkMode = !get().darkMode;
    set({ darkMode: newDarkMode });
    saveToLocalStorage('darkMode', newDarkMode);
  },

  // Workout related methods
  setUpcomingWorkouts: (workouts) => {
    set({ upcomingWorkouts: workouts });
    saveToLocalStorage('upcomingWorkouts', workouts);
  },

  finishWorkout: (workoutId, calories) => {
    const { upcomingWorkouts, recentWorkouts } = get();
    const finishedWorkout = upcomingWorkouts.find(workout => workout.id === workoutId);

    if (finishedWorkout) {
      const updatedUpcomingWorkouts = upcomingWorkouts.filter(workout => workout.id !== workoutId);

      const updatedRecentWorkouts = [
        { ...finishedWorkout, name: finishedWorkout.exercise_name || 'Unnamed Workout', calories }, // Connect calories to recent workouts
        ...recentWorkouts.slice(0, 1)  // Limit recent workouts to 2
      ];

      set({
        upcomingWorkouts: updatedUpcomingWorkouts,
        recentWorkouts: updatedRecentWorkouts
      });

      saveToLocalStorage('upcomingWorkouts', updatedUpcomingWorkouts);
      saveToLocalStorage('recentWorkouts', updatedRecentWorkouts);
    }
  },

  // Method to clear workout history
  clearWorkoutHistory: () => {
    set({ recentWorkouts: [] });
    localStorage.removeItem('recentWorkouts');
  },
}));
