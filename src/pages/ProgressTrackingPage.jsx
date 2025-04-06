import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useAuthStore } from '../Store/useAuthStore';

const ProgressTrackingPage = () => {
  const { darkMode, dailyStats } = useAuthStore();

  // Sample data for Calories (Weekly)
  const [caloriesData, setCaloriesData] = useState([
    { day: 'Monday', calories: 1200 },
    { day: 'Tuesday', calories: 1100 },
    { day: 'Wednesday', calories: 900 },
    { day: 'Thursday', calories: 1000 },
    { day: 'Friday', calories: 1300 },
  ]);

  // Sample data for Distance Covered & Steps Taken
  const [distanceData, setDistanceData] = useState([
    { day: 'Monday', distance: 5, steps: 8000 },
    { day: 'Tuesday', distance: 4.5, steps: 7500 },
    { day: 'Wednesday', distance: 6, steps: 9000 },
    { day: 'Thursday', distance: 4, steps: 7000 },
    { day: 'Friday', distance: 5.2, steps: 8500 },
  ]);

  // Update daily stats from Zustand store
  useEffect(() => {
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    setCaloriesData((prevData) =>
      prevData.map((item) =>
        item.day === currentDay ? { ...item, calories: dailyStats.calories } : item
      )
    );

    setDistanceData((prevData) =>
      prevData.map((item) =>
        item.day === currentDay
          ? { ...item, distance: dailyStats.distance, steps: dailyStats.steps }
          : item
      )
    );
  }, [dailyStats]);

  return (
    <div className={`min-h-screen w-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} flex flex-col items-center`}>
      <div className={`w-11/12 md:w-1/2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-md rounded-lg p-8`}>
        <h2 className="text-2xl font-bold mb-4">Your Fitness Progress</h2>

        {/* Calories Pie Chart with Label */}
        <div className="flex flex-col items-center mb-6">
          <h3 className="text-xl mb-2">Calories Burned (Weekly)</h3>
          <PieChart width={500} height={500}>
            <Pie data={caloriesData} dataKey="calories" nameKey="day" cx="50%" cy="50%" outerRadius={120}>
              {caloriesData.map((entry, index) => (
                <Cell key={index} fill={index % 2 === 0 ? "#66BB6A" : "#2E7D32"} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <p className="text-lg font-semibold mt-4 text-gray-700">Breakdown of calories burned this week</p>
        </div>

        {/* Distance & Steps Line Chart with Legend */}
        <div>
          <h3 className="text-xl mb-2">Distance Covered & Steps Taken (Weekly)</h3>
          <LineChart width={500} height={300} data={distanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="distance" stroke="#FF5733" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="steps" stroke="#3498DB" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default ProgressTrackingPage;
