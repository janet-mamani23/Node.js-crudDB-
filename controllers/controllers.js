var express = require ('express');

const listapersonas = (req, res, next) => {
    const db= req.app.get("db");
    const query = "SELECT * from persona";
    db.query(query,function(err,rows){
      if(err){
        console.log(err);
        return; 
      }
      res.render("personas",{profesores:rows, title: "LISTA DE PERSONAS"});  //va direccionado al views archivo profesores
    })
}

const agregarpersona =  function(req, res, next) {
    res.render('agregar',{});
};
const postAgregarpersona = function(req, res, next) {
    const db= req.app.get("db");
    const nombre = req.body.nombre;
    const email = req.body.email;
    const query = "INSERT into persona (nombre, email) VALUES (?, ?)";
    db.query(query, [nombre, email], function(err) {

      if(err){
        console.log(err);
        return;
      }
      res.redirect("/profesores");
      })
    }
    
const geteditarpersona = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    console.log(id);
    db.query("SELECT * FROM persona WHERE Id = ?",id,function(err,row){
      if(err){
        console.error(err);
          return;
        }
        console.log(row);
        res.render('edit',{item:row});
        })
        
  };

const postupdatepersona = function(req, res, next) {
    var db = req.app.get("db");
    var id = req.params.id;
    var nombre = req.body.nombre;
    var email = req.body.email; // Obtén la descripción del formulario
    db.query("UPDATE persona SET nombre=?, email=? WHERE id=?", [nombre, email, id], function(err) {
      if(err){
        console.error(err);
        return;
      }
      res.redirect("/personas")
      });
      
    };
const getdeletepersona = function(req,res,next){
  var db = req.app.get('db');
  var id = req.params.id;
  db.query("SELECT * FROM persona WHERE id=?", id, function(err, rows) {
      if (err) {
          console.error(err);
          return;
      }
      res.render('borrar', { item: rows[0], title: "Borrar" });
  });
}

const postdeletepersona = function(req, res, next) {
  var db = req.app.get('db');
  var id = req.params.id;
  db.query("DELETE FROM persona WHERE id=?", id, function(err) {
      if (err) {
          console.error(err);
          return;
      }
      res.redirect('/personas');
  });
}

const buscarpersona = (req, res, next) => {
  res.render('busqueda', { title: "Buscar" });
}

const buscarpersonaresultados = (req, res, next) => {
  const db = req.app.get("db");
  const keyword = req.body.keyword;
  const query = 'SELECT * FROM persona WHERE nombre LIKE ?';
  db.query(query, [`%${keyword}%`], (err, rows) => {
      if (err) throw err;
      res.render('resultados', { personas: rows, title: "Resultados" })
  });
}





module.exports = {
    listapersonas,
    agregarpersona,
    postAgregarpersona,
    geteditarpersona,
    postupdatepersona,
    getdeletepersona,
    postdeletepersona, 
    buscarpersona,
    buscarpersonaresultados

};