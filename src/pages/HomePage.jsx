import React, { useState, useEffect } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import CalorieIcon from "../assets/Calorie.png";
import DistanceIcon from "../assets/Distance.png";
import StepsIcon from "../assets/steps.png";

const HomePage = () => {
  const {
    darkMode,
    updateCaloriesBurned,
    updateDistanceTraveled,
    updateStepsTaken,
    caloriesBurned,
    distanceTraveled,
    stepsTaken,
    upcomingWorkouts,
    finishWorkout,
    recentWorkouts,
  } = useAuthStore();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(true);
  const [inputValues, setInputValues] = useState({
    calories: "",
    distance: "",
    steps: ""
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastSubmitted = localStorage.getItem('lastSubmittedDate');
    if (lastSubmitted === today) {
      setShowForm(false);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCaloriesBurned(inputValues.calories);
    updateDistanceTraveled(inputValues.distance);
    updateStepsTaken(inputValues.steps);
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('lastSubmittedDate', today);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleFinishWorkout = (workoutId) => {
    const caloriesBurned = prompt("Enter the calories burned for this workout:");
    if (caloriesBurned !== null && caloriesBurned.trim() !== '') {
      finishWorkout(workoutId, Number(caloriesBurned));
      alert("Workout finished and moved to history!");
    } else {
      alert("Please enter valid calories.");
    }
  };

  const handleLogWorkout = () => {
    navigate('/workout-log');
  };

  return (
    <div className={`min-h-screen w-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} flex justify-center`}>
      <div className="w-full max-w-5xl flex flex-col items-center p-4">
      <div className="w-full flex justify-between items-center mb-6 bg-green-700">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-12" />
            <h1 className="text-xl font-bold ml-4">Ready for your Workout today?</h1>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2">Calories Burned</label>
              <input
                type="number"
                name="calories"
                value={inputValues.calories}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}`}
                placeholder="Enter calories"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Distance Traveled (km)</label>
              <input
                type="number"
                name="distance"
                value={inputValues.distance}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
                placeholder="Enter distance"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Steps Taken</label>
              <input
                type="number"
                name="steps"
                value={inputValues.steps}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
                placeholder="Enter steps"
                required
              />
            </div>
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 w-full md:col-span-3">Submit</button>
          </form>
        )}

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} shadow-lg rounded-lg p-4 text-center flex flex-col items-center w-full`}>
            <img src={CalorieIcon} alt="Calorie Icon" className="w-8 h-8 mb-2" />
            <p className="text-lg font-bold">{caloriesBurned || "0"}</p>
            <p className="text-gray-600">Calories Burned</p>
          </div>
          <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} shadow-lg rounded-lg p-4 text-center flex flex-col items-center w-full`}>
            <img src={DistanceIcon} alt="Distance Icon" className="w-8 h-8 mb-2" />
            <p className="text-lg font-bold">{distanceTraveled || "0"} km</p>
            <p className="text-gray-600">Distance Traveled</p>
          </div>
          <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} shadow-lg rounded-lg p-4 text-center flex flex-col items-center w-full`}>
            <img src={StepsIcon} alt="Steps Icon" className="w-8 h-8 mb-2" />
            <p className="text-lg font-bold">{stepsTaken || "0"}</p>
            <p className="text-gray-600">Steps Taken</p>
          </div>
        </div>

        <button onClick={handleLogWorkout} className="bg-green-500 text-white py-3 px-6 mb-6 rounded-full hover:bg-green-700">Log Workout</button>

        <div className="w-full mb-6">
          <h2 className="font-bold mb-4">Upcoming Workouts</h2>
          {upcomingWorkouts && upcomingWorkouts.length > 0 ? (
            upcomingWorkouts.map((workout, index) => (
              <div key={index} className={`${darkMode ? "bg-gray-700 text-white" : "bg-gray-100"} shadow-lg rounded-lg p-4 flex justify-between items-center mb-4`}>
                <div>
                  <p>{workout.exercise_name || "Unnamed Workout"}</p>
                  <p className="text-gray-500">{workout.time}</p>
                </div>
                <button className="bg-green-500 text-white px-4 py-2 rounded-full" onClick={() => handleFinishWorkout(workout.id)}>Finish</button>
              </div>
            ))
          ) : (
            <p>No upcoming workouts found</p>
          )}
        </div>

        <div className="w-full mb-6">
          <h2 className="font-bold mb-4">Recent Workouts</h2>
          {recentWorkouts.length > 0 ? (
            recentWorkouts.map((workout, index) => (
              <div key={index} className={`${darkMode ? "bg-gray-700 text-white" : "bg-gray-100"} shadow-lg rounded-lg p-4 mb-4`}>
                <p>{workout.exercise_name || "Unnamed Workout"}</p>
                <p>Date: {workout.date || "No date provided"}</p>
                <p>Duration: {workout.duration || "No duration provided"}</p>
              </div>
            ))
          ) : (
            <p>This section will show recently completed workouts.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;