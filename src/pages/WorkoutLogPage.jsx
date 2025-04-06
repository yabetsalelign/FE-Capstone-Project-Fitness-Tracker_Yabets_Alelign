import React, { useState } from 'react';
import { apiPost } from '../api/wgerApi';  // Ensure API utility is imported correctly
import { useAuthStore } from '../Store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const WorkoutLogPage = () => {
  const { darkMode, setUpcomingWorkouts, upcomingWorkouts } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    exerciseName: '',
    exerciseType: '',
    duration: '',
    timeOfDay: '',
    intensity: 1,
  });

  // Submit handler for logging the workout
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      date: formData.date,
      exercise_name: formData.exerciseName,  // Make sure the exercise name flows
      exercise_type: formData.exerciseType,
      duration: formData.duration,
      time_of_day: formData.timeOfDay,
      intensity: formData.intensity,
    };

    try {
      await apiPost('workout/', payload);  // API call to log the workout
      alert('Workout logged successfully!');
      
      // Add new workout to upcomingWorkouts
      const newWorkout = { ...payload, id: Date.now() };
      setUpcomingWorkouts([...upcomingWorkouts, newWorkout]);

      // Navigate to Home Page after logging workout
      navigate('/home');
    } catch (error) {
      console.error('Error logging workout:', error);
      alert('Failed to log workout');
    }
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`min-h-screen w-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} flex flex-col items-center`}>
      <div className={`w-11/12 md:w-1/2 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg p-8`}>
        <h2 className="text-2xl font-bold mb-4">Log New Workout</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label>Date</label>
          <input 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            className={`border rounded p-2 w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`} 
            required 
          />
          <label>Exercise Name</label>
          <input 
            type="text" 
            name="exerciseName" 
            value={formData.exerciseName} 
            onChange={handleChange} 
            className={`border rounded p-2 w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`} 
            placeholder="Enter exercise name" 
            required 
          />
          <label>Exercise Type</label>
          <select 
            name="exerciseType" 
            value={formData.exerciseType} 
            onChange={handleChange} 
            className={`border rounded p-2 w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`} 
            required
          >
            <option value="">Select</option>
            <option value="Cardio">Cardio</option>
            <option value="Strength">Strength</option>
            <option value="Flexibility">Flexibility</option>
            <option value="Yoga">Yoga</option>
          </select>
          <label>Duration (minutes)</label>
          <input 
            type="number" 
            name="duration" 
            value={formData.duration} 
            onChange={handleChange} 
            className={`border rounded p-2 w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`} 
            placeholder="Enter duration" 
            required 
          />
          <label>Time of Day</label>
          <input 
            type="time" 
            name="timeOfDay" 
            value={formData.timeOfDay} 
            onChange={handleChange} 
            className={`border rounded p-2 w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`} 
            required 
          />
          <label>Intensity</label>
          <input 
            type="range" 
            name="intensity" 
            min="1" 
            max="10" 
            value={formData.intensity} 
            onChange={handleChange} 
            className="w-full" 
            required 
          />
          <button 
            type="submit" 
            className="bg-green-500 text-white py-2 px-8 rounded-full hover:bg-green-700 w-full"
          >
            Save Workout
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkoutLogPage;