DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	id SERIAL NOT NULL,
    product VARCHAR(30),
    department VARCHAR(30),
    price DOUBLE(10, 2),
    stock INTEGER(10),
    PRIMARY KEY(id)
);

INSERT INTO products (product, department, price, stock)
VALUES  ("seal plushie", "Toys R Us", 4.5, 50),
		("SNES", "Nintendo", 100, 20),
        ("guitar", "Guitar Center", 500.99, 5),
        ("I-Phone Plus", "Apple", 250, 35),
        ("book", "Library", 10, 100),
        ("Refurbished Laptop", "Acer", 625, 2),
        ("Leprachaun", "Fantasy Island", 9999, 1),
        ("rubber band", "Office Depot", 0.05, 2413),
        ("Airbook", "Apple", 1000, 12),
        ("Super Mario World", "Nintendo", 20, 9);
        
-- SELECT * FROM products;