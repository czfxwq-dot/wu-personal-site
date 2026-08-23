-- 家长决策调研 D1 数据库 Schema

CREATE TABLE IF NOT EXISTS responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  lang TEXT DEFAULT 'zh',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  submitted_at DATETIME,
  duration_sec INTEGER,
  ip_hash TEXT,
  status TEXT DEFAULT 'valid'
);

CREATE TABLE IF NOT EXISTS panas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  response_id INTEGER NOT NULL,
  item TEXT NOT NULL,
  score INTEGER NOT NULL,
  FOREIGN KEY (response_id) REFERENCES responses(id)
);

CREATE TABLE IF NOT EXISTS decisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  response_id INTEGER NOT NULL,
  question_no INTEGER NOT NULL,
  choice TEXT NOT NULL,
  confidence INTEGER NOT NULL,
  happiness INTEGER NOT NULL,
  FOREIGN KEY (response_id) REFERENCES responses(id)
);

CREATE TABLE IF NOT EXISTS open_response (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  response_id INTEGER NOT NULL,
  content TEXT,
  FOREIGN KEY (response_id) REFERENCES responses(id)
);

CREATE TABLE IF NOT EXISTS math_test (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  response_id INTEGER NOT NULL,
  answer INTEGER,
  FOREIGN KEY (response_id) REFERENCES responses(id)
);

CREATE TABLE IF NOT EXISTS demographics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  response_id INTEGER NOT NULL,
  gender TEXT,
  age_group TEXT,
  education TEXT,
  has_child TEXT,
  FOREIGN KEY (response_id) REFERENCES responses(id)
);
