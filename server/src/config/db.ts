import Database from "better-sqlite3";

const db = new Database("hostel.db");

// Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT CHECK(role IN ('admin', 'student')) NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_no TEXT UNIQUE,
    capacity INTEGER,
    occupied INTEGER
  );
  
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    rollNumber TEXT UNIQUE NOT NULL,
    roomNumber TEXT,
    course TEXT,
    year INTEGER,
    FOREIGN KEY(userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT,
    created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
  );

  CREATE TABLE IF NOT EXISTS dashboard (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    roomCount INTEGER DEFAULT 0,
    studentCount INTEGER DEFAULT 0
  );

  INSERT OR IGNORE INTO dashboard (id, roomCount, studentCount) VALUES (1, 0, 0);
`);

export default db;
