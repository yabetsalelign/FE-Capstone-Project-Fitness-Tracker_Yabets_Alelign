import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../Store/useAuthStore'; // Correct path to the Zustand store

const WorkoutHistoryPage = () => {
  const { darkMode, recentWorkouts, clearWorkoutHistory } = useAuthStore();
  const [workoutHistory, setWorkoutHistory] = useState([]);

  useEffect(() => {
    setWorkoutHistory(recentWorkouts);
  }, [recentWorkouts]);

  const handleClearHistory = () => {
    clearWorkoutHistory();
    setWorkoutHistory([]);
    alert('Workout history cleared successfully!');
  };

  return (
    <div className={`min-h-screen w-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} flex flex-col items-center py-10`}>
      <div className={`w-11/12 max-w-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl rounded-2xl p-6 md:p-10`}>
        <h2 className="text-3xl font-bold mb-8 text-center">Workout History</h2>

        {workoutHistory && workoutHistory.length > 0 ? (
          <>
            <div className="space-y-4 mb-6">
              {workoutHistory.map((workout, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-5 shadow-md transition-all ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}
                >
                  <h3 className="text-lg font-semibold mb-2">{workout.name || 'Unnamed Workout'}</h3>
                  <p className="text-sm mb-1">📅 <strong>Date:</strong> {workout.date || 'No date provided'}</p>
                  <p className="text-sm mb-1">⏱️ <strong>Duration:</strong> {workout.duration || 'No duration provided'}</p>
                  <p className="text-sm">🔥 <strong>Calories:</strong> {workout.calories || 'No calories data'}</p>
                </div>
              ))}
            </div>
            <button
              onClick={handleClearHistory}
              className="bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded-lg font-medium transition duration-200"
            >
              Clear Workout History
            </button>
          </>
        ) : (
          <p className="text-center text-lg text-gray-500 dark:text-gray-300">No workout history available.</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutHistoryPage;
