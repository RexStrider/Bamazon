require(`dotenv`).config();

let mysql = require(`mysql`);

let inquirer = require(`inquirer`);

let keys = require(`./key.js`);

let connectDB = () => {
    return mysql.createConnection({
        host: `localhost`,
        port: 8090,
        user: `root`,
        password: keys.sql.pass,
        database: `bamazon_db`
    })
}



let displayProducts = () => {
    // return new Promise ((resolve, reject) => {
        let connection = connectDB();

        connection.query(`SELECT * FROM products`, (err, res) => {
            if (err) {
                // return reject(err);
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
            connection.end( err => { return reject(err) });
            // resolve();
        });
    // })
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
    })
}

let restockItem = () => {
    
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
    .then( (err, res) => {
        if (err) throw err;
        console.log(res);

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
                .then((err, res) => {
                    if (err) throw err;
                    console.log(res);

                    // console.log(`restocking `)
                    restockItem(res.item_id, res.quantity);
                })
                break;
            case `Add New Product`:
            //   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
                break;
            default:
                console.log(`How did you get this message... WHAT DID YOU DO!?`);
        }
    });
}

startMenu();