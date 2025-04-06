import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../Store/useAuthStore'; // Correct path to the Zustand store

const WorkoutHistoryPage = () => {
  const { darkMode, recentWorkouts, clearWorkoutHistory } = useAuthStore(); // Access the clearWorkoutHistory method
  const [workoutHistory, setWorkoutHistory] = useState([]);

  useEffect(() => {
    setWorkoutHistory(recentWorkouts);
  }, [recentWorkouts]);

  const handleClearHistory = () => {
    clearWorkoutHistory(); // Call the clearWorkoutHistory function
    setWorkoutHistory([]); // Clear the local state to reflect the cleared history
    alert('Workout history cleared successfully!');
  };

  return (
    <div className={`min-h-screen w-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} flex flex-col items-center`}>
      <div className={`w-11/12 md:w-1/2 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg p-8`}>
        <h2 className="text-2xl font-bold mb-4">Workout History</h2>

        {workoutHistory && workoutHistory.length > 0 ? (
          <>
            {workoutHistory.map((workout, index) => (
              <div key={index} className={`rounded-lg p-4 mb-4 shadow-md ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <h3 className="font-bold">{workout.name || 'Unnamed Workout'}</h3>
                <p>Date: {workout.date || 'No date provided'}</p>
                <p>Duration: {workout.duration || 'No duration provided'}</p>
                <p>Calories: {workout.calories || 'No calories data'}</p>
              </div>
            ))}
            <button
              onClick={handleClearHistory}
              className={`bg-red-600 text-white py-2 px-6 mt-4 rounded-md hover:bg-red-700 w-full ${darkMode ? 'bg-red-700' : 'bg-red-600'}`}
            >
              Clear Workout History
            </button>
          </>
        ) : (
          <p>No workout history available.</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutHistoryPage;