import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useAuthStore } from '../Store/useAuthStore';

const ProgressTrackingPage = () => {
  const { darkMode, dailyStats } = useAuthStore();

  const [caloriesData, setCaloriesData] = useState([
    { day: 'Monday', calories: 1200 },
    { day: 'Tuesday', calories: 1100 },
    { day: 'Wednesday', calories: 900 },
    { day: 'Thursday', calories: 1000 },
    { day: 'Friday', calories: 1300 },
  ]);

  const [distanceData, setDistanceData] = useState([
    { day: 'Monday', distance: 5, steps: 8000 },
    { day: 'Tuesday', distance: 4.5, steps: 7500 },
    { day: 'Wednesday', distance: 6, steps: 9000 },
    { day: 'Thursday', distance: 4, steps: 7000 },
    { day: 'Friday', distance: 5.2, steps: 8500 },
  ]);

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
    <div className={`min-h-screen w-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} flex flex-col items-center py-10`}>
      <div className={`w-11/12 max-w-4xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl rounded-2xl p-6 md:p-10`}>
        <h2 className="text-3xl font-bold mb-8 text-center">Your Fitness Progress</h2>

        {/* Calories Pie Chart Section */}
        <div className="mb-12 border-b border-gray-300 pb-10">
          <h3 className="text-2xl font-semibold mb-4 text-center">Calories Burned (Weekly)</h3>
          <div className="flex justify-center">
            <PieChart width={300} height={300}>
              <Pie
                data={caloriesData}
                dataKey="calories"
                nameKey="day"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {caloriesData.map((entry, index) => (
                  <Cell key={index} fill={index % 2 === 0 ? "#66BB6A" : "#2E7D32"} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
          <p className="text-md mt-4 text-center text-gray-600 dark:text-gray-300">
            Breakdown of calories burned throughout the week
          </p>
        </div>

        {/* Distance & Steps Line Chart Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-center">Distance & Steps (Weekly)</h3>
          <div className="flex justify-center overflow-x-auto">
            <LineChart width={500} height={300} data={distanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="distance" stroke="#FF5733" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="steps" stroke="#3498DB" strokeWidth={2} />
            </LineChart>
          </div>
          <p className="text-md mt-4 text-center text-gray-600 dark:text-gray-300">
            Daily progress on distance covered and steps taken
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTrackingPage;
