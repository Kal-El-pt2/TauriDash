import { appWindow } from '@tauri-apps/api/window';
import { open } from '@tauri-apps/plugin-sql';

async function initializeDatabase() {
  // Open the database connection
  const db = await open('sqlite:my_database.db'); // Matches the path in tauri.conf.json

  // Check if the tables exist and create them if they do not
  await db.execute(`
    CREATE TABLE IF NOT EXISTS TaskLog (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_name TEXT NOT NULL,
      date_time TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS TaskDetails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_log_id INTEGER NOT NULL,
      subtask_name TEXT NOT NULL,
      status BOOLEAN NOT NULL,
      time INTEGER NOT NULL,
      FOREIGN KEY (task_log_id) REFERENCES TaskLog(id)
    );
  `);
  
  return db;
}

// Export the function to initialize the database
export default initializeDatabase;
