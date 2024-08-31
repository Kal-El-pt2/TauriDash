use rusqlite::{Connection, Result};

fn create_tables(conn: &Connection) -> Result<()> {
    conn.execute(
        "CREATE TABLE IF NOT EXISTS TaskLog (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_name TEXT NOT NULL,
            date_time TEXT NOT NULL
        )",
        [],
    )?;
    
    conn.execute(
        "CREATE TABLE IF NOT EXISTS TaskDetails (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_log_id INTEGER NOT NULL,
            subtask_name TEXT,
            status TEXT,
            time TEXT,
            FOREIGN KEY (task_log_id) REFERENCES TaskLog(id)
        )",
        [],
    )?;
    Ok(())
}

fn main() {
    let conn = Connection::open("mydatabase.db").expect("Failed to open database");
    create_tables(&conn).expect("Failed to create tables");

    // Rest of your Tauri setup...
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![/* your commands */])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
