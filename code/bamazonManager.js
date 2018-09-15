const inq = require('inquirer'),
    sql = require('mysql'),
    log = console.log,
    Table = require('cli-table-redemption');

const con = sql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'YouShouldChangeThisPassword',
    database: 'Bamazon'
})

const start = () => {
    inq.prompt([{
        type: 'list',
        name: 'duties',
        message: 'Choose an action:',
        choices: ['View - All Inventory', 'View - Low Inventory', 'Add - Inventory', 'Add - Products']
    }]).then(answers => {
        switch (answers.duties) {
            case 'View - All Inventory':
                viewProducts();
                break;
            case 'View - Low Inventory':
                lowInventory();
                break;
            case 'Add - Inventory':
                addToInventory();
                break;
            case 'Add - New Products':
                addNewProduct();
                break;
            default:
                log(`There must be an error`);
                con.end();
                break;
        }

    })
}

const viewProducts = () => {
    log(`***---~~~Product View~~~---***`);

    con.query(`SELECT * FROM products`, function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            log(`ID: ${res[i].item_id} | Product: ${res[i].product_name} | Price: ${res[i].price} | Stock Quantity: ${res[i].stock_quantity}`);
        }
        start();
    });
}

const lowInventory = () => {
    log(`***~~~---Low Inventory View---~~~***`);

    con.query(`SELECT * FROM products`, function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) {
                log(`ID: ${res[i].item_id} | Product: ${res[i].product_name} | Price: ${res[i].price} | Stock Quantity: ${res[i].stock_quantity}`);
            }
        }
        start();
    });
}

const addToInventory = () => {
    log(`~~~***---Add Inventory View---***~~~`);

    con.query(`SELECT * FROM products`, function (err, res) {
        if (err) throw err;
        let productArray = [];
        for (var i = 0; i < res.length; i++) {
            productArray.push(res[i].product_name);
        }
        inq.prompt([{
            type: 'list',
            name: 'product',
            choices: productArray,
            message: 'Which ID would you like to add inventory?'
        }, {
            type: 'input',
            name: 'qty',
            message: 'How many would you like to add?',
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    return false;
                }
            }
        }]).then(answer => {
            var currentQty;
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === answer.product) {
                    currentQty = res[i].stock_quantity;
                }
            }
            con.query(`UPDATE products SET ? WHERE ?`, [{
                    stock_quantity: currentQty + parseInt(answer.qty)
                },
                {
                    product_name: answer.product
                }
            ], function (err, res) {
                if (err) throw err;
                log(`The quantity was updated successfully.`);
                start();
            });
        })
    });
}

const addNewProduct = () => {
    log(`**--~~*-~Add Product View~-*~~--**`);

    inq.prompt([{
        name: 'name',
        type: 'input',
        message: 'Enter the name of the new product:'
    }, {
        name: 'department',
        type: 'input',
        message: 'Enter the department of the new product:'
    }, {
        name: 'price',
        type: 'input',
        message: 'Enter the price of the new product:'
    }, {
        name: 'qty',
        type: 'input',
        message: 'How many would you like to add?'
    }]).then(answer => {
        log(answer);
        con.query(`INSERT INTO products SET ?`, {
            product_name: answer.name,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.qty
        }, (err, res) => {
            if (err) throw err;
            let name = answer.name;
            log(`You added ${name}`);
            anotherTask();

        });
    }).catch(err => {
        if (err) throw err;
    });
}

const anotherTask = () => {
    inq.prompt([{
        name: 'answer',
        type: 'list',
        message: 'Would you like to perform another action?',
        choices: ['Yes', 'No']
    }]).then(answers => {
        switch (answers.answer) {
            case 'Yes':
                start();
                break;
            case 'No':
                log(`Thank you. Good bye.`);
                con.end();
                break;
            default:
                log(`Thank you. Good bye.`);
                con.end();
                break;
        }

    })
}
start();