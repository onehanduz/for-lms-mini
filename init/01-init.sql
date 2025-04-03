DROP TABLE IF EXISTS centers CASCADE;
DROP TABLE IF EXISTS tests CASCADE;
DROP TABLE IF EXISTS questions CASCADE;

CREATE TABLE IF NOT EXISTS centers(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    updated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tests(
    id SERIAL PRIMARY KEY,
    center_id SERIAL REFERENCES centers(id) ON DELETE CASCADE,
    title VARCHAR(255),
    description TEXT,
    updated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS questions(
    id SERIAL PRIMARY KEY,
    text TEXT,
    options VARCHAR(255)[],
    test_id SERIAL REFERENCES tests(id) ON DELETE CASCADE,
    updated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT now()
);

INSERT INTO centers (title)
VALUES ('Universal');