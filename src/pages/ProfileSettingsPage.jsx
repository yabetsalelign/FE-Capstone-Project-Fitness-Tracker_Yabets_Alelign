import React, { useState } from 'react';
import { useAuthStore } from '../Store/useAuthStore';

const ProfilePage = () => {
  const {
    currentUser,
    isAuthenticated,
    darkMode,
    toggleDarkMode,
    updateUserProfile,
    notificationsEnabled,
    toggleNotifications,
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
    return <p className="text-center mt-10 text-lg">You need to log in to view your profile.</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formValues);
    setShowManage(false);
  };

  const closeOverlay = () => {
    setShowManage(false);
    setShowThemeSelection(false);
    setShowNotifications(false);
    setShowPrivacy(false);
  };

  return (
    <div className={`min-h-screen w-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} flex flex-col items-center py-10`}>
      <div className={`w-11/12 max-w-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl rounded-2xl p-8`}>
        {/* Profile Header */}
        <div className="flex items-center mb-8">
          <div className={`w-16 h-16 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-blue-500'} flex items-center justify-center text-white text-2xl font-bold`}>
            {currentUser.name ? currentUser.name[0] : 'U'}
          </div>
          <div className="ml-4 space-y-1">
            <h2 className="text-2xl font-semibold">{currentUser.name}</h2>
            <p className="text-sm">📧 {currentUser.email}</p>
            <p className="text-sm">⚧️ {currentUser.gender || 'Not specified'}</p>
            <p className="text-sm">🎂 Age: {currentUser.age || 'Not specified'}</p>
            <p className="text-sm">📏 Height: {currentUser.height ? `${currentUser.height} meters` : 'Not specified'}</p>
            <p className="text-sm">⚖️ Weight: {currentUser.weight ? `${currentUser.weight} pounds` : 'Not specified'}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-medium" onClick={() => setShowManage(true)}>
            ✏️ Manage Account
          </button>
          <button className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg font-medium" onClick={() => setShowThemeSelection(true)}>
            🎨 Theme Selection
          </button>
          <button className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-medium" onClick={() => setShowNotifications(true)}>
            🔔 Notification Preferences
          </button>
          <button className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg font-medium" onClick={() => setShowPrivacy(true)}>
            🔒 Privacy Settings
          </button>
        </div>
      </div>

      {/* Manage Account Overlay */}
      {showManage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Manage Account</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {['gender', 'age', 'height', 'weight'].map((field) => (
                <div key={field}>
                  <label className="block text-sm mb-1 capitalize">{field}:</label>
                  <input
                    type={field === 'age' || field === 'height' || field === 'weight' ? 'number' : 'text'}
                    name={field}
                    value={formValues[field]}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                    placeholder={`Enter your ${field}`}
                  />
                </div>
              ))}
              <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg">
                Save Changes
              </button>
              <button onClick={closeOverlay} type="button" className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg mt-2">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Theme Selection Overlay */}
      {showThemeSelection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4">Theme Settings</h3>
            <div className="flex items-center justify-between">
              <span>Dark Mode:</span>
              <button
                onClick={toggleDarkMode}
                className={`py-2 px-4 rounded-lg font-medium ${
                  darkMode ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                } text-white`}
              >
                {darkMode ? 'Disable' : 'Enable'}
              </button>
            </div>
            <button onClick={closeOverlay} className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Notification Preferences Overlay */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4">Notification Preferences</h3>
            <div className="flex items-center justify-between">
              <span>Notifications:</span>
              <button
                onClick={toggleNotifications}
                className={`py-2 px-4 rounded-lg font-medium ${
                  notificationsEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                } text-white`}
              >
                {notificationsEnabled ? 'On' : 'Off'}
              </button>
            </div>
            <button onClick={closeOverlay} className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Privacy Settings Overlay */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4">Privacy Settings</h3>
            <p className="text-sm">Manage your privacy preferences here.</p>
            <button onClick={closeOverlay} className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
