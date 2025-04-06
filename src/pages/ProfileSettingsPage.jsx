import React, { useState } from 'react';
import { useAuthStore } from '../Store/useAuthStore';

const ProfilePage = () => {
  const {
    currentUser,
    isAuthenticated,
    darkMode,
    toggleDarkMode,
    updateUserProfile,
    notificationsEnabled, // Added for notification toggle
    toggleNotifications, // Action to toggle notifications
  } = useAuthStore();
  
  const [showManage, setShowManage] = useState(false);
  const [showThemeSelection, setShowThemeSelection] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const [formValues, setFormValues] = useState({
    gender: currentUser.gender || '',
    age: currentUser.age || '',
    height: currentUser.height || '',
    weight: currentUser.weight || '',
  });

  if (!isAuthenticated) {
    return <p>You need to log in to view your profile.</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the user's profile in Zustand store
    updateUserProfile(formValues);
    setShowManage(false); // Close the overlay after submission
  };

  const closeOverlay = () => {
    setShowManage(false);
    setShowThemeSelection(false);
    setShowNotifications(false);
    setShowPrivacy(false);
  };

  return (
    <div className={`min-h-screen w-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} flex flex-col items-center`}>
      <div className={`w-11/12 md:w-1/2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-md rounded-lg p-8 mt-20`}>
        <div className="flex items-center mb-8">
          <div className={`w-16 h-16 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-blue-500'} flex items-center justify-center text-white text-2xl font-bold`}>
            {currentUser.name ? currentUser.name[0] : 'U'}
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold">{currentUser.name}</h2>
            <p>Email: {currentUser.email}</p>
            <p>Gender: {currentUser.gender || 'Not specified'}</p>
            <p>Age: {currentUser.age || 'Not specified'}</p>
            <p>Height: {currentUser.height ? `${currentUser.height} meters` : 'Not specified'}</p>
            <p>Weight: {currentUser.weight ? `${currentUser.weight} pounds` : 'Not specified'}</p>
          </div>
        </div>

        <div className="space-y-6">
          <button className="w-full bg-green-700 text-white py-2 rounded-full hover:bg-blue-800" onClick={() => setShowManage(true)}>
            Manage Account
          </button>
          <button className="w-full bg-green-700 text-white py-2 rounded-full hover:bg-blue-800" onClick={() => setShowThemeSelection(true)}>
            Theme Selection
          </button>
          <button className="w-full bg-green-700 text-white py-2 rounded-full hover:bg-blue-800" onClick={() => setShowNotifications(true)}>
            Notification Preferences
          </button>
          <button className="w-full bg-green-700 text-white py-2 rounded-full hover:bg-blue-800" onClick={() => setShowPrivacy(true)}>
            Privacy Settings
          </button>
        </div>
      </div>

      {/* Manage Account Overlay */}
      {showManage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <h3 className="text-lg font-bold mb-4">Manage Account</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Gender:</label>
                <input
                  type="text"
                  name="gender"
                  value={formValues.gender}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                  placeholder="Enter your gender"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Age:</label>
                <input
                  type="number"
                  name="age"
                  value={formValues.age}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                  placeholder="Enter your age"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Height (in meters):</label>
                <input
                  type="number"
                  name="height"
                  value={formValues.height}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                  placeholder="Enter your height"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Weight (in pounds):</label>
                <input
                  type="number"
                  name="weight"
                  value={formValues.weight}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                  placeholder="Enter your weight"
                />
              </div>
              <button type="submit" className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 w-full">
                Save Changes
              </button>
            </form>
            <button onClick={closeOverlay} className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Theme Selection Overlay */}
      {showThemeSelection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Theme Settings</h3>
            <div className="flex items-center justify-between">
              <p className="mr-4">Dark Mode:</p>
              <button
                onClick={toggleDarkMode}
                className={`py-2 px-4 rounded ${
                  darkMode ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
              </button>
            </div>
            <button onClick={closeOverlay} className="mt-4 bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Notification Preferences Overlay */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Notification Preferences</h3>
            <div className="flex items-center justify-between">
              <p>Notifications:</p>
              <button
                onClick={toggleNotifications}
                className={`py-2 px-4 rounded ${
                  notificationsEnabled ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {notificationsEnabled ? 'On' : 'Silent'}
              </button>
            </div>
            <button onClick={closeOverlay} className="mt-4 bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Privacy Settings Overlay */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Privacy Settings</h3>
            <p>Manage your privacy preferences here.</p>
            {/* Add privacy settings fields here */}
            <button onClick={closeOverlay} className="mt-4 bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;