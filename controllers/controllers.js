var express = require ('express');

const listaprofesores = (req, res, next) => {
    const db= req.app.get("db");
    const query = "SELECT * from profesores";
    db.query(query,function(err,rows){
      if(err){
        console.log(err);
        return; 
      }
      res.render("profesores",{profesores:rows, title: "LISTA DE PROFESORES"});  //va direccionado al views archivo profesores
    })
}

const agregarprofesores =  function(req, res, next) {
    res.render('agregar',{});
};
const postagregarprofesores = function(req, res, next) {
    const db= req.app.get("db");
    const nombre = req.body.nombre;
    const materia = req.body.materia;
    const query = "INSERT into profesores(Nombre,Materia) VALUES (?,?)";
  
    db.query(query,[nombre, materia],function(err){
      if(err){
        console.log(err);
        return;
      }
      res.redirect("/profesores");
      })
    }
    
const geteditarprofesores = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    console.log(id);
    db.query("SELECT * FROM profesores WHERE Id = ?",id,function(err,row){
      if(err){
        console.error(err);
          return;
        }
        console.log(row);
        res.render('edit',{item:row});
        })
        
  };

const postupdateprofesores = function(req, res, next) {
    var db = req.app.get("db");
    var id = req.params.id;
    var nombre = req.body.nombre;
    var materia = req.body.materia;
    db.query("UPDATE profesores SET Nombre = ? Materia = ? WHERE Id = ?", [nombre, materia],function(err){
      if(err){
        console.error(err);
        return;
      }
      res.redirect("/profesores")
      });
      
    };
const getdeleteprofesores = function(req,res,next){
    var db = req.app.get('db');
    var id = req.params.id;
  
    db.query("DELETE FROM profesores WHERE Id = ?",id,function(err){
      if(err) {
        console.error(err);
        return;
      }
      res.redirect('/profesores')
    })
  };
  


module.exports = {
    listaprofesores,
    agregarprofesores,
    postagregarprofesores,
    geteditarprofesores,
    postupdateprofesores,
    getdeleteprofesores 
}; 


