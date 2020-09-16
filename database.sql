DROP DATABASE IF EXISTS foodfy;
CREATE DATABASE foodfy;

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    name TEXT,
    path TEXT NOT NULL
);

CREATE TABLE chefs (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    file_id INTEGER REFERENCES files(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    ingredients TEXT[] NOT NULL,
    preparation TEXT[] NOT NULL,
    information TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    chef_id INTEGER
    REFERENCES chefs(id)
);

CREATE TABLE recipe_files (
    id SERIAL PRIMARY KEY,

    recipe_id INTEGER NOT NULL
    REFERENCES recipes(id),

    file_id INTEGER NOT NULL
    REFERENCES files(id)
);
