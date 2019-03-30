require(`dotenv`).config();

const mysql = require(`mysql`);

const inquirer = require(`inquirer`);

const keys = require(`./key.js`);

const connectDB = () => {
    return mysql.createConnection({
        host: `localhost`,
        port: 3306,
        user: `root`,
        password: keys.sql.pass,
        database: `bamazon_db`
    });
}

let displayProducts = () => {
        let connection = connectDB();
        connection.query(`SELECT * FROM products`, (err, res) => {
            if (err) throw err;
            for (i in res) {
                console.log(
                    ` id: ${res[i].id} |`,
                    `${res[i].product} |`,
                    `price: $${res[i].price} |`,
                    `stock left: ${res[i].stock} |`,
                    `department: ${res[i].department}\n`
                );
            }
            connection.end();
        });
}

let displayLowInventory = () => {
    let connection = connectDB();
    connection.query(`SELECT * FROM products WHERE stock < 5`, (err, res) => {
        if (err) throw err;
        for (i in res) {
            console.log(
                ` id: ${res[i].id} |`,
                `${res[i].product} |`,
                `price: $${res[i].price} |`,
                `stock left: ${res[i].stock} |`,
                `department: ${res[i].department}\n`
            );
        }
        connection.end();
    })
}

let restockItem = (id, quantity) => {
    let connection = connectDB();
    connection.query(`SELECT product, stock FROM products WHERE ?`, [{id: id}], (err, res) => {
        if (err) throw err;
        let product = res[0].product;
        let newStock = res[0].stock + parseInt(quantity);
        connection.query(`UPDATE products SET ? WHERE ?`, [
            { stock: newStock },
            { id: id }
        ], (err, res) => {
            if (err) throw err;
            console.log(`${product} now has ${newStock} in stock`);
            connection.end();
        })
    });
}

let addNewProduct = (product, department, price, quantity) => {
    let connection = connectDB();
    connection.query(`INSERT INTO products (product, department, price, stock, sales) VALUES (?)`,
    [[ product, department, price, quantity, 0 ]],
    (err, res) => {
        if (err) throw err;
        console.log(`${product} has been entered into the database`);
        console.log(`price: $${price}`);
        console.log(`stock: ${quantity}`);
        console.log(`department: ${department}`);

        connection.end();
    })
}

let startMenu = () => {
    // * List a set of menu options:
    //     * View Products for Sale
    //     * View Low Inventory
    //     * Add to Inventory
    //     * Add New Product
    inquirer.prompt([
        {
            type: `list`,
            message: `List of Menu Options:`,
            choices: [
                `View Products for Sale`,
                `View Low Inventory`,
                `Add to Inventory`,
                `Add New Product`
            ],
            name: `option`
        }
    ])
    .then(res => {
        switch(res.option) {
            case `View Products for Sale`:
            //   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
                displayProducts();
                break;
            case `View Low Inventory`:
            //   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
                displayLowInventory();
                break;
            case `Add to Inventory`:
            //   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
                inquirer.prompt([
                    {
                        type: `input`,
                        message: `Enter the id of an item:`,
                        name: `item_id`
                    },
                    {
                        type: `input`,
                        message: `enter the quantity of items you want to re-stock:`,
                        name: `quantity`
                    }
                ])
                .then(res => {
                    restockItem(res.item_id, res.quantity);
                });
                break;
            case `Add New Product`:
            //   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
                let connection = connectDB();

                connection.query(`SELECT department_name FROM departments`, (err, res) => {
                    if (err) throw err;

                    let dep=[];
                    for (i in res) {
                        dep.push(res[i].department_name);
                    }

                    connection.end();

                    inquirer.prompt([
                        {
                            type: `input`,
                            message: `Enter the name of the product:`,
                            name: `product`
                        },
                        {
                            type: `list`,
                            message: `Choose a department for this product:`,
                            choices: dep,
                            name: `department`
                        },
                        {
                            type: `input`,
                            message: `Enter the price of the product:`,
                            name: `price`
                        },
                        {
                            type: `input`,
                            message: `Enter the amount currently in stock:`,
                            name: `stock`
                        }
                    ])
                    .then(res => {
                        addNewProduct(res.product, res.department, res.price, res.stock);
                    });
                })
                break;
            default:
                console.log(`Uh oh... the default switch case has been activated. This shouldn't be possible...`);
        }
    })
    .catch(err => {
        console.log(err);
    });
}

startMenu();