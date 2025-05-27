import React from 'react';

function ProfilePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">Update your personal details and account settings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;