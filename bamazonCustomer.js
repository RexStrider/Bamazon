require(`dotenv`).config();

let mysql = require(`mysql`);

let inquirer = require(`inquirer`);

let keys = require(`./key.js`)

// connect to database
let connectDB = () => {
    return mysql.createConnection({
        host: `localhost`,
        port: 3306,
        user: `root`,
        password: keys.sql.pass,
        database: `bamazon_db`
    });
}

let start = () => {
    displayProducts()
    .then(promptPurchase);
}

// display available items
let displayProducts = () => {
    return new Promise ((resolve, reject) => {
        let connection = connectDB();

        connection.query(`SELECT * FROM products`, (err, res) => {
            if (err) {
                return reject(err);
            };
            for (i in res) {
                console.log(
                    ` id: ${res[i].id} |`,
                    `${res[i].product} |`,
                    `price: $${res[i].price} |`,
                    `stock left: ${res[i].stock} |`,
                    `department: ${res[i].department}\n`
                ); }
            connection.end( err => { return reject(err) });
            resolve();
        });
    })
}

let promptPurchase = () => {
    inquirer.prompt([
        {
            type: `input`,
            message: `Enter the id of the item you desire: `,
            name: `item_id`
        },
        {
            type: `input`,
            message: `Enter the quantity of items you desire: `,
            name: `quantity`
        }
    ])
    .then( res => {
        console.log(`checking item ${res.item_id} to see if ${res.quantity} items are in stock.`);

        let connection = connectDB();
        
        connection.query(`SELECT stock FROM products WHERE id=?`, [res.item_id], (err, res_sql) => {
            if (err) throw err;

            if (res_sql[0].stock >= res.quantity) {
                console.log(`stock is available`);
                // purchase quantity and update database
                purchaseItems(res.item_id, res.quantity, res_sql[0].stock);
            }
            else {
                console.log(`stock is not available`);
            }

            connection.end();
        });
    })
    .catch ( err => {
        throw err;
    });
}

let purchaseItems = (id, quantity_purchased, stock) => {
    let connection = connectDB();

    connection.query(`UPDATE products SET ? WHERE ?`, [
        {
            stock: (stock - quantity_purchased)
        },
        {
            id: id
        }
    ], (err, res) => {
        if (err) throw err;

        console.log(`${res.affectedRows} row(s) affected`);

        displayPurchase(id, quantity_purchased);
    });

    connection.end();
}

let displayPurchase = (id, quant_purch) => {
    let connection = connectDB();

    connection.query(`SELECT product, price FROM products WHERE ?`, [{id: id}], (err, res) =>{
        if (err) throw err;

        let total = res[0].price * quant_purch;

        let product = ``;

        if (quant_purch > 1)
            if (res[0].product.charAt(res[0].product.length-1) === 's')
                product = `${res[0].product}es`;
            else product = `${res[0].product}s`;
        else product = `${res[0].product}`;

        console.log(`Total purchase is $${total} for ${quant_purch} ${product}`);

        connection.end();
    });
}

start();