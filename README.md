# Bamazon
A back-end application for a store front, using MySQL and Javascript.

###Set Up

 * You will need to install Node before you can use this project. You can find Node at the following link [https://nodejs.org/en/download/]

 * You will also need to install MySQL onto your computer. You can find MySQL at the following link [https://www.mysql.com/downloads/]

 * It may be worth your to set up MySQL workbench, although this is not requried. If you have set up your class paths correctly you should have access to MySQL from the command line. Still, some people prefer to work with a GUI, and if you are one of those folks, you can find MySQL workbench at the following link [https://www.mysql.com/products/workbench/]

 * To use this application, you will need to set up the node modules. This can be done by performing the following steps
    
    1. Open the command line
    
    2. navigate to the directory of the cloned Bamazon application
    
    3. type in either of the following commands into the command line
    ```
    npm install
    
    npm i
    ```

 * You will also have to set up the database. This can be done at the command line by typing in the following command
    
    ```
    mysql < bamazon.sql
    ```
    
    * You are effectively telling your OS to feed in the script into the MySQL application. This should seed the intial database for Bamazon.

 * If you find yourself being denied access to MySQL, chances are you set up a password for your database. The error might look something like 'ERROR 1045: Access denied for user'. In this case you can try the following  command
    
    ```
    mysql -u root -p < bamazon.sql
    ```
    
    * The difference is you are setting the user to 'root' and you will be prompted to enter your password

 * Don't remember your password? I'm afraid you may have to uninstall and then re-install MySQL. At least it should be easier installing the software a second time.

 * As an alternative, you can try to set up MySQL workbench and run the script 'bamazon.sql' using the GUI.

 * One last thing, you will need to set up a .env file. This is referenced in all of the scripts and will contain the password for MySQL. Without the file the scripts will not function as intended.
    
    * To set up the file, create a file with the name '.env'

    * add the following text to the file

    ```javascript
    SQL_PASS=your-pass-word-here

    ```

    * If you did not set up a password, that's ok. You will still need to set up this file. Simply add the following text instead

    ```javascript
    SQL_PASS=

    ```

    * The scripts will need a variable to reference, even if nothing is being stored in that variable. Otherwise you might recieve errors when running the scripts.

### Running a script

 * To run the scripts, simply type in one of the following command

 ```
 node bamazonCustomer.js

 node bamazonManager.js

 node bamazonSupervisor.js
 ```

 * When the scripts run, they should prompt you for the correct input, and update the databases apporpriately

 * Below are some screenshots of the scripts being run

 