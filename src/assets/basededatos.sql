CREATE TABLE IF NOT EXISTS usuarios(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT, 
    password TEXT
);
CREATE TABLE IF NOT EXISTS comentarios(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contenido TEXT, 
    user_id INTEGER,
    comic_id INTEGER
);
