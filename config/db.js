const mysql = require("mysql")
const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'serversiderender',
    port : 3306

})
conn.connect((err)=>{
    if(err){
        console.log("error in connection");
    }
    else{
        console.log("connected with db");

    }
})
module.exports.con= conn