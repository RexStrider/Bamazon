require(`dotenv`).config();

const mysql = require(`mysql`);

const inquirer = require(`inquirer`);

const cTable = require(`console.table`);

const keys = require(`./key.js`);

const connectDB = () => {
    return mysql({
        host: `localhost`,
        port: 3306,
        user: `root`,
        password: keys.sql.pass,
        database: `bamazon_db`
    });
}

