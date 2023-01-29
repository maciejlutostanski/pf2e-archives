use std::*;
use surrealdb::sql::Value;
use surrealdb::Datastore;
use surrealdb::Error;
use surrealdb::Session;

#[tauri::command]
pub async fn recreate_database(
    database: tauri::State<'_, Datastore>,
    session: tauri::State<'_, Session>,
) -> Result<String, String> {
    let db = &*database;
    let ses = &*session;

    match test(db, ses).await {
        Err(error) => Err(error.to_string()),
        Ok(str) => Ok(str),
    }
}

#[tauri::command]
pub async fn get_entity_by_page(
    database: tauri::State<'_, Datastore>,
    session: tauri::State<'_, Session>,
    entity: String,
    limit: u8,
    skip: u8,
) -> Result<Value, String> {
    println!("Get {} by page: limit: {}, start: {}", entity, limit, skip);

    let db = &*database;
    let ses = &*session;
    let query = format!(
        "SELECT * FROM {entity} ORDER BY name ASC LIMIT {limit} START {skip};",
        entity = entity,
        limit = limit,
        skip = skip
    );
    let res = db.execute(&*query, ses, None, false).await.expect("msg");

    Ok(res[0].result.as_ref().unwrap().to_owned())
}

#[tauri::command]
pub async fn get_entity_count(
    database: tauri::State<'_, Datastore>,
    session: tauri::State<'_, Session>,
    entity: String,
) -> Result<Value, String> {
    println!("Get {} count", entity);

    let db = &*database;
    let ses = &*session;
    let query = format!(
        "SELECT count() FROM {entity} GROUP BY ALL;",
        entity = entity
    );
    let res = db.execute(&*query, ses, None, false).await.expect("msg");
    println!("{}", res[0].speed());

    Ok(res[0].result.as_ref().unwrap().to_owned())
}

#[tauri::command]
pub async fn get_entity_by_id(
    database: tauri::State<'_, Datastore>,
    session: tauri::State<'_, Session>,
    id: String,
) -> Result<Value, String> {
    println!("Get {}", id);

    let db = &*database;
    let ses = &*session;
    let query = format!("SELECT * FROM {id}", id = id);
    let res = db.execute(&*query, ses, None, false).await.expect("msg");

    Ok(res[0].result.as_ref().unwrap().to_owned())
}

async fn test(db: &Datastore, ses: &Session) -> Result<String, Error> {
    let delete_feats = "DELETE feats";
    db.execute(delete_feats, ses, None, false).await?;

    let file_path = "db/feat.json";
    let contents = fs::read_to_string(file_path).expect("Should have been able to read the file");
    let new_data = format!("INSERT INTO feats {};", contents);
    let res = db.execute(&*new_data, ses, None, false).await;

    match res {
        Err(err) => println!("{}", err.to_string()),
        Ok(response) => println!("{}", response[0].result.as_ref().unwrap()),
    };

    Ok("Database recreated".to_string())
}
