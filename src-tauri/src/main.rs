use couchbase_lite::{
    Database, Document, DatabaseFlags,
    fallible_streaming_iterator::FallibleStreamingIterator
};

#[derive(Serialize, Deserialize, Debug)]
#[serde(tag = "type")]
struct Message {
    msg: String,
}

#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    let mut db = Database::open_with_flags(
        &std::env::temp_dir().join("a.cblite2"),
        DatabaseFlags::CREATE,
    )?;
    {
        let msg = Message { msg: "Test message".into() };
        let mut trans = db.transaction()?;
        let enc = trans.shared_encoder_session()?;
        let mut doc = Document::new(&msg, enc)?;
        trans.save(&mut doc)?;
        trans.commit()?;
    }
    println!("we have {} documents in db", db.document_count());

    tauri::Builder::default()
        .plugin(tauri_plugin_sqlite::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
