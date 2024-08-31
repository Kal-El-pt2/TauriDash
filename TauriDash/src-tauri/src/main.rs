#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use serde::{Deserialize};
use tauri::command;
use tauri::State;
use tauri::Manager;
use tauri_plugin_sql::{Migration, MigrationKind, SqlitePool};

// Struct for holding the input data for the commands
#[derive(Deserialize)]
struct TaskDetails {
    task_log_id: i64,
    subtask_name: String,
    status: bool,
    time: String,
}

#[command]
async fn add_task(pool: State<'_, SqlitePool>, task_name: String, date: String) -> Result<i64, String> {
    let mut conn = pool.acquire().await.map_err(|e| e.to_string())?;
    let query = "INSERT INTO TaskLog (task_name, date_time) VALUES (?1, ?2)";
    let result = sqlx::query(query)
        .bind(task_name)
        .bind(date)
        .execute(&mut conn)
        .await
        .map_err(|e| e.to_string())?;
    
    let last_id = result.last_insert_rowid();
    Ok(last_id)
}

#[command]
async fn add_task_details(pool: State<'_, SqlitePool>, task_details: TaskDetails) -> Result<(), String> {
    let mut conn = pool.acquire().await.map_err(|e| e.to_string())?;
    let query = "INSERT INTO TaskDetails (task_log_id, subtask_name, status, time) VALUES (?1, ?2, ?3, ?4)";
    sqlx::query(query)
        .bind(task_details.task_log_id)
        .bind(task_details.subtask_name)
        .bind(task_details.status)
        .bind(task_details.time)
        .execute(&mut conn)
        .await
        .map_err(|e| e.to_string())?;

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::init(SqlitePool::new(
            "sqlite:my_database.db",
        )))
        .invoke_handler(tauri::generate_handler![add_task, add_task_details])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
