import React, { useState } from 'react';

function WorkoutLog() {
  const [workouts, setWorkouts] = useState([]);

  const handleAddWorkout = (e) => {
    e.preventDefault();
    const newWorkout = {
      exercise: e.target.exercise.value,
      sets: e.target.sets.value,
      reps: e.target.reps.value,
      weight: e.target.weight.value,
      timestamp: new Date(),
    };
    setWorkouts([...workouts, newWorkout]);
  };

  return (
    <div>
      <h2>Log Your Workouts</h2>
      <form onSubmit={handleAddWorkout}>
        <input type="text" name="exercise" placeholder="Exercise" required />
        <input type="number" name="sets" placeholder="Sets" required />
        <input type="number" name="reps" placeholder="Reps" required />
        <input type="number" name="weight" placeholder="Weight (kg)" required />
        <button type="submit">Add Workout</button>
      </form>
      <h3>Workout History</h3>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            {workout.timestamp.toLocaleString()} - {workout.exercise}, {workout.sets} sets, {workout.reps} reps, {workout.weight}kg
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutLog;
