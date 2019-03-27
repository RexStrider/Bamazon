require(`dotenv`).config();

let mysql = require(`mysql`);

let inquirer = require(`inquirer`);

let keys = require(`./key.js`);

let connectDB = () => {
    return mysql.createConnection({
        host: `localhost`,
        port: 3306,
        user: `root`,
        password: keys.sql.pass,
        database: `bamazon_db`
    })
}



let displayProducts = () => {
        let connection = connectDB();

        connection.query(`SELECT * FROM products`, (err, res) => {
            if (err) {
                throw err;
            }
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
        // console.log(res);

        let product = res[0].product;
        let newStock = res[0].stock + parseInt(quantity);

        // console.log(`stock: ${res[0].stock} ${typeof(res[0].stock)}`);
        // console.log(`quantity: ${quantity} ${typeof(quantity)}`);

        connection.query(`UPDATE products SET ? WHERE ?`, [
            { stock: newStock },
            { id: id }
        ], (err, res) => {
            if (err) throw err;
            // console.log(res);

            console.log(`${product} now has ${newStock} in stock`);
            connection.end();
        })
    });
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
            message: `List of menu options:`,
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
        // if (err) throw err;
        console.log(res.option);

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
                    // if (err) throw err;
                    console.log(res);

                    // console.log(`restocking `)
                    restockItem(res.item_id, res.quantity);
                })
                // .catch(err => {
                //     console.log(err);
                // });
                break;
            case `Add New Product`:
            //   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
                break;
            default:
                console.log(`How did you get this message... WHAT DID YOU DO!?`);
        }
    })
    .catch(err => {
        console.log(err);
    });
}

startMenu();