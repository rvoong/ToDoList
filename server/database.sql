CREATE DATABASE todolist;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

    -- PRIMARY KEY makes it unique
    -- SERIAL increase PRIMARY KEY to ensure uniqueness  
    -- max character of 255
    -- this can be done directly on the command line