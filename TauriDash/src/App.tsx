import React, { useEffect } from 'react';
import { initializeDatabase } from './database'; // Ensure the correct path is used
import AddTask from './components/addtask/addtask'; // Ensure the correct path is used

function App() {
  useEffect(() => {
    // Check if running in Tauri environment
    if (window.__TAURI_IPC__) {
      initializeDatabase()
        .then(() => {
          console.log('Database initialized successfully!');
        })
        .catch((error) => {
          console.error('Error initializing database:', error);
        });
    } else {
      console.error('Tauri environment not detected.');
    }
  }, []);

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      {/* Render the AddTask component */}
      <AddTask />
    </div>
  );
}

export default App;
