require(`dotenv`).config();

const mysql = require(`mysql`);

const inquirer = require(`inquirer`);

const cTable = require(`console.table`);

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

let displayProductSalesByDepartment = () => {
    let connection = connectDB();

    connection.query(`SELECT department_id, department_name, over_head_costs, sales FROM departments LEFT JOIN products ON departments.department_name=products.department ORDER BY department_id`, (err, res) => {
        if (err) throw err;
        let departments=[];
        for (i in res) {
            let d_id = res[i].department_id;
            if ( ! departments.includes(d_id))
                departments.push(d_id);
        }
        let department_names=[];
        let department_sales=[];
        let over_head_costs=[];
        for (i in res) {
            let d_index = departments.indexOf(res[i].department_id);
            if ( ! department_sales[d_index])
                department_sales[d_index] = 0;
            department_sales[d_index] += res[i].sales;
            over_head_costs[d_index] = res[i].over_head_costs;
            department_names[d_index] = res[i].department_name;
        }
        let table = [];
        for (i in departments) {
            table.push({
                department_id: departments[i],
                department_name: department_names[i],
                department_sales: department_sales[i],
                over_head_costs: over_head_costs[i],
                total_profit: Number(Math.round((department_sales[i] - over_head_costs[i]) + `e2`) + `e-2`)
            })
        }
        table = cTable.getTable(table);
        console.log(`\n${table}`);
        connection.end();
    })
}

let createNewDepartment = () => {
    inquirer.prompt([
        {
            type: `input`,
            message: `Enter the name of the department`,
            name: `department`
        },
        {
            type: `input`,
            message: `Please enter the over head cost:`,
            name: `cost`
        }
    ])
    .then(res => {
        let connection = connectDB();
        let department = res.department;
        let overHeadCosts = parseFloat(res.cost);
        connection.query(`INSERT INTO departments (department_name, over_head_costs) VALUES (?)`,
        [[department, overHeadCosts]],
        (err, res) =>{
            if (err) throw err;
            console.log(`inserted department ${department} with an over head cost of ${overHeadCosts}`);
            connection.end();
        });
    });
}

let startMenu = () => {
    inquirer.prompt([
        {
            type: `list`,
            message: `Welcome Supervisor, please select an option:`,
            choices: [`View Product Sales by Department`, `Create New Department`],
            name: `option`
        }
    ])
    .then(res => {
        switch(res.option) {
            case `View Product Sales by Department`:
                displayProductSalesByDepartment();
                break;
            case `Create New Department`:
                createNewDepartment();
                break;
            default:
                console.log(`what happened?`);
        }
    })
    .catch(err => {
        console.log(err);
    })
}


startMenu();
