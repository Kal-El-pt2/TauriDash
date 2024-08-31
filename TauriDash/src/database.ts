import Database from '@tauri-apps/plugin-sql';

export async function initializeDatabase() {
  try {
    // Create a new instance of the Database class
    const db = new Database('sqlite:my_database.db');

    // Create TaskLog table if it doesn't exist
    await db.execute(`
      CREATE TABLE IF NOT EXISTS TaskLog (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_name TEXT NOT NULL,
        date_time TEXT NOT NULL
      );
    `);

    // Create TaskDetails table if it doesn't exist
    await db.execute(`
      CREATE TABLE IF NOT EXISTS TaskDetails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_log_id INTEGER NOT NULL,
        subtask_name TEXT NOT NULL,
        status BOOLEAN NOT NULL,
        time TEXT NOT NULL,
        FOREIGN KEY (task_log_id) REFERENCES TaskLog(id)
      );
    `);

    console.log('Database initialized successfully!');
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
