pub mod database;

use surrealdb::Datastore;
use surrealdb::Error;
use surrealdb::Session;

use crate::database::*;

#[cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// #[tauri::command]
// async fn test(
//     database: tauri::State<'_, Datastore>,
//     session: tauri::State<'_, Session>,
// ) -> Result<String, Error> {
//     let db = &*database;
//     let ses = &*session;

//     let new_db = "CREATE company:surrealdb SET name = 'SurrealDB', cofounders = [person:tobie, person:jaime];";
//     db.execute(new_db, &ses, None, false).await?;

//     let ast = "SELECT * FROM company:surrealdb;";
//     let res = db.execute(ast, &ses, None, false).await?;

//     println!("{}", res.len());
//     // for item in res {
//     //     println!("{}", item.result.unwrap());
//     // }

//     Ok(res[0].result.as_ref().unwrap().to_string())
// }

fn main() {
    // // let database = Datastore::new("file://temp.db").await?;
    // let database = Datastore::new("memory").await?;
    // let session = Session::for_db("ns", "pf2");

    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default().build())
        .invoke_handler(tauri::generate_handler![greet,])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
