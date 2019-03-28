DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	id SERIAL NOT NULL,
    product VARCHAR(30),
    department VARCHAR(30),
    price DOUBLE(10, 2),
    stock INTEGER(10),
    sales DOUBLE(10, 2),
    PRIMARY KEY(id)
);

CREATE TABLE departments (
    department_id SERIAL NOT NULL,
    department_name VARCHAR(30),
    over_head_costs DOUBLE(10, 2),
    PRIMARY KEY (department_id)
);

INSERT INTO products (product, department, price, stock, sales)
VALUES  ("seal plushie", "Toys", 4.5, 50, 0),
		("SNES", "Games", 100, 20, 0),
        ("guitar", "Music", 500.99, 5, 0),
        ("I-Phone Plus", "Technology", 250, 35, 0),
        ("book", "Library", 10, 100, 0),
        ("Refurbished Laptop", "Technology", 625, 2, 0),
        ("Leprachaun", "Fantasy", 9999, 1, 0),
        ("rubber band", "Office", 0.05, 2413, 0),
        ("Airbook", "Technology", 1000, 12, 0),
        ("Super Mario World", "Games", 20, 9, 0);

INSERT INTO departments (department_name, over_head_costs)
VALUES  ("Toys", 1000),
        ("Games", 2000),
        ("Music", 500.50),
        ("Technology", 1505.05),
        ("Fantasy", 52.22),
        ("Office", 5050.01);

-- SELECT * FROM products;
-- SELECT * FROM departments;