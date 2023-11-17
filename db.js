const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    //host: 'mysql',
    user: 'root',
    password: '1234',
});
    
db.connect((err)=> {
    if (err){
        console.log("Error en la consola al servidor");
        return;
    }
    db.query("CREATE DATABASE IF NOT EXISTS CRUD-APP",(err)=>{
        if (err){
            console.log("error al crear la db");
            return;
        }
        console.log("DB creada o ya existe");
    });
    db.query("USE CRUD-APP",(err) => {
        if(err){
            console.log("error al seleccionar la db");
            return;
        }
        console.log("conexion exitosa");
    });
    const create_TableSQL = `
        CREATE TABLE IF NOT EXISTS persona (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(255),
            email VARCHAR(255)
            
        )   `;
    db.query(create_TableSQL,(err) => {
        if(err){
            console.log("Error al crear tabla");
            return;
        }
    });
});
module.exports = db;
