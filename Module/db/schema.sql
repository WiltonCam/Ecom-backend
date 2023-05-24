DROP DATABASE IF EXISTS merch_dev;
CREATE DATABASE merch_dev;

\c merch_dev;

CREATE TABLE merchs (
    id SERIAL PRIMARY KEY,
    image TEXT NOT NULL,
    name TEXT NOT NULL,
    cost DECIMAL,
    category TEXT
);

