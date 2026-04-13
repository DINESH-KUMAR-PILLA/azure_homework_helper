const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = process.env.DB_PATH || './data/candidate_support.db';
const dir = path.dirname(dbPath);

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id                    INTEGER PRIMARY KEY AUTOINCREMENT,
    candidate_name        TEXT NOT NULL,
    problem_statement     TEXT NOT NULL,
    input_output_examples TEXT,
    code                  TEXT NOT NULL,
    language              TEXT DEFAULT 'unknown',
    score                 INTEGER NOT NULL,
    verdict               TEXT NOT NULL,
    is_correct            INTEGER NOT NULL,
    errors_json           TEXT NOT NULL,
    feedback              TEXT NOT NULL,
    improvement_tips_json TEXT NOT NULL,
    created_at            TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS article_cache (
    concept    TEXT PRIMARY KEY,
    data_json  TEXT NOT NULL,
    expires_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS video_cache (
    concept    TEXT PRIMARY KEY,
    data_json  TEXT NOT NULL,
    expires_at TEXT NOT NULL
  );
`);

module.exports = db;
