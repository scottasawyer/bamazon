/// Dependencies
const inq = require('inquirer'),
    sql = require('mysql'),
    chalk = require('chalk'), /// Terminal String Styling
    fig = require('figlet'), /// Uses ASCII art as fonts
    log = console.log,
    con = sql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'YouShouldChangeThisPassword',
        database: 'Bamazon'
    });

fig.text('   BAMAZON', {
    font: 'colossal',
}, function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    log(data);
    begin();
});

const begin = () => {
    con.query(`SELECT * FROM products`, (err, res) => {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            log(`ID: ${res[i].item_id} | Product: ${res[i].product_name} | Price: ${res[i].price} | Stock Quantity: ${res[i].stock_quantity}`);
        }
        inq.prompt([{
                type: 'input',
                name: 'id',
                message: 'What is the ID of the product you would like to purchase?',
                validate: (value) => {
                    if (value > res.length) {
                        log(`\r\nSorry, that is not a valid ID.`);
                    } else {
                        return true;
                    }
                }
            },
            {
                type: 'input',
                name: 'qty',
                message: 'How many would you like to purchase?',
            }
        ]).then(answer => {
            let whatToBuy = (answer.id) - 1,
                howMuchToBuy = parseInt(answer.qty),
                grandTotal = parseFloat(((res[whatToBuy].price) * howMuchToBuy).toFixed(2)); 

            if (res[whatToBuy].stock_quantity >= howMuchToBuy) {
                con.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: (res[whatToBuy].stock_quantity - howMuchToBuy)
                    },
                    {
                        item_id: answer.id
                    }
                ], function (err, res) {

                    if (err) throw err;
                    log(chalk.green.bold(`Success! Your the total for your purchase is $ ${grandTotal.toFixed(2)}. Please allow 3-5 business days for shipping.`));
                    rePrompt();
                });
            } else {
                log(`We are sorry. There is not enough stock to complete your purchase. Please try again later.\r\n-----------------------`);
                begin();
            }
        })
    })
}

const rePrompt = () => {
    inq.prompt([{
        type: 'list',
        name: 'add',
        message: 'Would you like to make another purchase?',
        choices: ['Yes', 'No']
    }]).then(answer => {
        switch (answer.add) {
            case 'Yes':
                begin();
                break
            case 'No':
                log(`Thank you. Come Back Soon`);
                con.end();
                break
            default:
                log(`Thank you. Come Back Soon`);
                con.end();
                break;
        }
    })
}