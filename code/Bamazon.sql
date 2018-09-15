CREATE DATABASE Bamazon;
Use Bamazon;

CREATE TABLE products (
    item_id INTEGER(100) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES  ('Raspberry Pi 3 B+ Motherboard', 'Electronics', '39.78', '15'),
            ('Light Alarm Clock with Sunrise Simulation', 'Electronics', '49.99', '40'),
            ('Epic All Natural Meat Bar - Box of 12', 'Food', '28.99', '50'),
            ('KIND Bars, Dark Chocolate Nuts & Sea Salt - 12 CT', 'Food', '14.19', '12'),
            ('Lenovo Yoga 710-15 - 15.6" FHD Touch-Screen', 'Electronics', '645.98', '9'),
            ('Rub n Buff Wax Metallic Finish, Ebony', 'Hobby', '7.82', '65'),
            ('Dovetail Marker', 'Tools', '24.83', '20'),
            ('Wagner BD126404E Premium E-Coated Brake Rotor', 'Automotive', '34.78', '18'),
            ('Carolina Reaper Hot Pepper Sauce with Sweet Black Cherries', 'Food', '10.15', '98'),
            ('Numenera Corebook', 'Books', '43.82', '36'),
            ('Febreze Extra Strength Fabric Refresher - Pack of 2', 'Household', '12.13', '19'),
            ('Plastic Sword Picks (asstd colors)', 'Tableware', '3.99', '107'),
            ('750 Series Socket Chisel Set', 'Tools', '78.55', '13'),
            ('Understanding Wood: A Craftsmans Guide to Wood Technology', "Books", '25.80', '16')

