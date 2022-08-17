BEGIN;

DROP TABLE IF EXISTS users, products CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- CREATE TABLE shopping_cart (
--   id SERIAL PRIMARY KEY,
--   product_name VARCHAR(255) NOT NULL,
--   price INTEGER,
--   amount INTEGER,
--   user_id INTEGER REFERENCES users(id)
-- );


CREATE TABLE products(
  name TEXT PRIMARY KEY,
  price INTEGER,
  quantity INTEGER
);

INSERT INTO users (username, email, password) VALUES
  ('Sery1976', 'sery1976@gmail.com', 415),
  ('ramie', 'ramiebash@gmail.com', 123)
;

-- INSERT INTO shopping_cart (product_name, price, amount, user_id) VALUES
--   ('iphone 13 pro', 999, 3, 1),
--   ('intel core i9 pc', 1899, 2, 2)
-- ;

INSERT INTO products (name, price, quantity) VALUES
  ('iphone13', 3499.99, 20),
  ('MacBook', 4559.99, 8),
  ('DellLaptop', 2229.99, 50),
  ('tablet', 1264.99, 40),
  ('ipad', 3689.99, 30),
  ('keyboard', 799.99, 25),
  ('mouse', 399.99, 25),
  ('airPods', 999.99, 35)
;
COMMIT;

