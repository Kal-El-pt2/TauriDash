// src-tauri/tasks.rs

use rusqlite::{params, Connection, Result};

// Function to add a task
#[tauri::command]
pub fn add_task(task_name: String, date: String) -> Result<i64> {
    let conn = Connection::open("tasks.db")?;
    conn.execute(
        "INSERT INTO TaskLog (task_name, date) VALUES (?1, ?2)",
        params![task_name, date],
    )?;
    Ok(conn.last_insert_rowid())
}

// Function to add task details
#[tauri::command]
pub fn add_task_details(task_log_id: i64, time: String, status: String, subtasks: String) -> Result<()> {
    let conn = Connection::open("tasks.db")?;
    conn.execute(
        "INSERT INTO TaskDetails (task_log_id, time, status, subtasks) VALUES (?1, ?2, ?3, ?4)",
        params![task_log_id, time, status, subtasks],
    )?;
    Ok(())
}
