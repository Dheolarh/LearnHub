import React from 'react';

function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">My Progress</h2>
          <p className="text-gray-600 dark:text-gray-300">Track your learning journey</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Recent Courses</h2>
          <p className="text-gray-600 dark:text-gray-300">Continue where you left off</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Achievements</h2>
          <p className="text-gray-600 dark:text-gray-300">View your accomplishments</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;