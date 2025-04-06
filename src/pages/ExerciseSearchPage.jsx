import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet } from '../api/wgerApi';  // API utility
import { useAuthStore } from '../Store/useAuthStore';

const ExerciseSearchPage = () => {
  const { darkMode } = useAuthStore();
  const [exercises, setExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [muscle, setMuscle] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams({
      name: searchTerm,
      muscles: muscle,
      category: type,
    });

    try {
      const data = await apiGet(`exercise/?${params.toString()}`);
      setExercises(data.results);
    } catch (error) {
      console.error("Failed to fetch exercises:", error);
    }
  };

  const handleDetailsClick = (id) => {
    navigate(`/exercise-details/${id}`);
  };

  return (
    <div className={`min-h-screen w-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} flex flex-col items-center`}>
      <div className={`w-11/12 md:w-1/2 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg p-8 mt-20`}>
        <h2 className="text-2xl font-bold mb-4">Discover New Exercises</h2>
        <form className="space-y-4" onSubmit={handleSearch}>
          <label>Search for Exercise</label>
          <input
            type="text"
            className={`border rounded p-2 w-full ${darkMode ? 'bg-gray-700 text-white placeholder-gray-300' : 'bg-gray-100 text-gray-900 placeholder-gray-500'}`}
            value={searchTerm}
            placeholder="Enter exercise name"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <label>Muscle Group</label>
          <select
            className={`border rounded p-2 w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
            value={muscle}
            onChange={(e) => setMuscle(e.target.value)}
          >
            <option value="">All</option>
            <option value="1">Upper Body</option>
            <option value="2">Lower Body</option>
            <option value="3">Core</option>
          </select>
          <label>Exercise Type</label>
          <select
            className={`border rounded p-2 w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All</option>
            <option value="1">Strength</option>
            <option value="2">Cardio</option>
          </select>
          <button className="bg-green-500 text-white py-2 px-8 rounded-full hover:bg-green-700 w-full">
            Search
          </button>
        </form>
        <div className="mt-6">
          {exercises.length ? (
            exercises.map((exercise) => (
              <div
                key={exercise.id}
                className={`rounded-lg p-4 mb-4 shadow-md cursor-pointer transform transition duration-300 hover:scale-105 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                onClick={() => handleDetailsClick(exercise.id)}
              >
                {exercise.name}
              </div>
            ))
          ) : (
            <p>No exercises found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseSearchPage;