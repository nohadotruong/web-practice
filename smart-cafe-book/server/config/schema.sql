CREATE TABLE roles (
	id SERIAL PRIMARY KEY,
	role TEXT UNIQUE NOT NULL
);

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email TEXT UNIQUE NOT NULL,
	username TEXT UNIQUE NOT NULL,
	firstname TEXT NOT NULL,
	lastname TEXT NOT NULL,
	password TEXT NOT NULL,
	dob DATE,
	phone TEXT UNIQUE NOT NULL,
	role_id INT REFERENCES roles(id) ON DELETE SET NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE users 
ADD COLUMN firstname TEXT DEFAULT '' NOT NULL, 
ADD COLUMN lastname TEXT DEFAULT '' NOT NULL;

ALTER TABLE users
ALTER COLUMN lastname DROP NOT NULL;

CREATE TABLE member_levels (
	id SERIAL PRIMARY KEY,
	level_name TEXT UNIQUE NOT NULL,
	min_point INT NOT NULL,
	description TEXT
);

CREATE TABLE memberships (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
	level_id INT REFERENCES member_levels(id) ON DELETE SET NULL,
	points INT DEFAULT 0,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM roles;
SELECT * FROM users;

INSERT INTO roles (role) VALUES ('Admin');

UPDATE users SET role_id = 2 WHERE username = 'ixxmmivsdrgn';

DELETE FROM users WHERE username = 'ixxmmivsdrgn';

DROP TABLE roles CASCADE;