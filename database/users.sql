CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20),
    password VARCHAR(100),
    status BOVARCHAR(50),
    role VARCHAR(50),
);