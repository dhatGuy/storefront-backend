CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) CHECK ("status" IN('active', 'complete')) NOT NULL DEFAULT 'active'
);
