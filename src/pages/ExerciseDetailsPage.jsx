import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Added Link for navigation
import { apiGet } from '../api/wgerApi';

// 🛠️ Personal note: I added Zustand for state management (useAuthStore) to handle global workout data like upcoming sessions and dark mode toggle. This made state more accessible across components without prop drilling.
import { useAuthStore } from '../Store/useAuthStore'; // Zustand store

const ExerciseDetailsPage = () => {
  const { id } = useParams();  // Get the exercise ID from the URL
  const { darkMode, addUpcomingWorkout } = useAuthStore(); // Extract Zustand store functions and state
  const [exerciseDetails, setExerciseDetails] = useState(null);

  useEffect(() => {
    const fetchExerciseDetails = async () => {
      try {
        const data = await apiGet(`exercise/${id}/`);
        setExerciseDetails(data);
      } catch (error) {
        console.error('Failed to fetch exercise details:', error);
      }
    };

    fetchExerciseDetails();
  }, [id]);

  const handleAddWorkout = () => {
    if (!exerciseDetails) {
      alert('Exercise details not available.');
      return;
    }

    const workout = {
      id: Date.now(), // Generate a unique ID for each workout
      name: exerciseDetails.name,
      time: new Date(Date.now() + 86400000).toLocaleDateString(), // Tomorrow's date
    };

    addUpcomingWorkout(workout);  // Call Zustand store function to add to upcoming workouts
    alert('Workout added to upcoming workouts!');
  };

  if (!exerciseDetails) return <p>Loading...</p>;

  const createMarkup = () => {
    return { __html: exerciseDetails.description };
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} flex flex-col items-center`}>
      <div className={`w-11/12 md:w-1/2 ${darkMode ? 'bg-gray-800' : 'bg-white'} bg-white shadow-md rounded-lg p-8 mt-10`}>
        
        {/* New navigation link */}
        <Link to="/exercises" className="text-blue-600 hover:underline mb-4 block">← Back to Exercises</Link>

        <h2 className="text-2xl font-bold mb-4">{exerciseDetails?.name}</h2>

        {/* Render HTML safely */}    
        <div className="mb-4" dangerouslySetInnerHTML={createMarkup()} />

        <label>Notes</label>
        <textarea className="border rounded p-2 w-full mb-6" rows="4"></textarea>

        <button
          onClick={handleAddWorkout}
          className="bg-blue-700 text-white py-2 px-8 rounded-full hover:bg-blue-800 w-full"
        >
          Add to Workout
        </button>
      </div>
    </div>
  );
};

export default ExerciseDetailsPage;
