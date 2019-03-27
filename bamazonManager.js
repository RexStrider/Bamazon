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

// * List a set of menu options:
//     * View Products for Sale
//     * View Low Inventory
//     * Add to Inventory
//     * Add New Product

let startMenu = () => {
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
                break;
            case `View Low Inventory`:
            //   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
                break;
            case `Add to Inventory`:
            //   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
                break;
            case `Add New Product`:
            //   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
                break;
            default:
                console.log(`How did you get this message... WHAT DID YOU DO!?`);
        }
    });
}