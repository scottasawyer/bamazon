# Bamazon

Bamazon is an Amazon-like storefront where users can purchase an item which then depletes the stock inventory from the MYSQL database.

## Getting Started

 * Clone repository
 * Run NPM install
 * Run command depending which mode you woule like to be on"
   * Customer - 'node bamazonCustomer.js'
   * Manager - 'node bamazonManager.js'

## JavaScript files

1. 'bamazonCustomer.js'
  * Console logs the products to the store.
  * Prompts user for a product number they would like to purchase.
  * Asks for the quantity.
    * If the stock quantity is sufficient, it will return the toal for that purchase.
    * If the stock quantity is insufficient, it will inform the user to try again later and returns to view all inventory.
    
2. 'bamazonManager.js'
  * User is promted to choose a view:
    * View - All Inventory
    * View - Low Inventory
    * Add - Inventory
    * Add - New Product

   * If the manager selects `View - All Inventory`, a complete list of the inventory is displayed with details.
   * If the manager selects `View - Low Inventory`, a list of the products with less than five items in its stock quantity column.
   * If the manager selects `Add - Inventory`, it allows the manager to select a product and add inventory.
   * If the manager selects `Add - New Product`, it allows the manager to add a new product to the store.

## Demo Videos

 * bamazonCustomer.js (https://youtu.be/4rlSLSu-vhA)
 * bamazonManager.js (https://youtu.be/nFAOAp5m2jk)

## Technologies Used

 * Node.js
 * JavaScript
 * Inquire NPM Package (https://www.npmjs.com/package/inquirer)
 * MYSQL NPM Package (https://www.npmjs.com/package/mysql)
 * Figlet NPM Package (https://www.npmjs.com/package/figlet)
 * Chalk NPM Package(https://www.npmjs.com/package/chalk)

## Prerequisites

  - Node.js - Download the latest version of Node https://nodejs.org/en/
  - Create a MYSQL database called 'Bamazon', reference schema.sql

## Built With

 * MySQL Workbench
 * Terminal/Gitbash
 * Visual Studio Code

## Author

 * **Scott Sawyer** - *Initial work* - [scottasawyer](https://github.com/scottasawyer)



