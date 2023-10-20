var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profesores', function(req, res, next) {
  const db= req.app.get("db");
  const query = "SELECT * from profesores";
  db.all(query,function(err,rows){
    if(err){
      console.log(err);
      return;
    }
    res.render('profesores', { 
      title: "lista",
      profesores:rows });
  })
  
});

router.get('/agregar', function(req, res, next) {
  res.render('agregar',{});
  });
router.post('/agregar', function(req, res, next) {
  const db= req.app.get("db");
  const nombre = req.body.nombre;
  const materia = req.body.materia;
  const query = "INSERT into profesores(Nombre,Materia) VALUES (?,?)";

  db.run(query,[nombre, materia],function(err){
    if(err){
      console.log(err);
      return;
    }
    res.redirect("/profesores");
    })
    
  });

router.get('/edit/:id', function(req, res, next) {
  var db = req.app.get('db');
  var id = req.params.id;
  console.log(id);
  db.get("SELECT * FROM profesores WHERE Id = ?",id,function(err,row){
    if(err){
      console.error(err);
        return;
      }
      console.log(row);
      res.render('edit',{item:row});
      })
      
});

router.post('/update/:id', function(req, res, next) {
  var db = req.app.get("db");
  var id = req.params.id;
  var nombre = req.body.nombre;
  var materia = req.body.materia;
  db.run("UPDATE profesores SET Nombre = ? Materia = ? WHERE Id = ?", [nombre, materia],function(err){
    if(err){
      console.error(err);
      return;
    }
    res.redirect("/profesores")
    });
    
  });

router.get('/delete/:id', function(req,res,next){
  var db = req.app.get('db');
  var id = req.params.id;

  db.run("DELETE FROM profesores WHERE Id = ?",id,function(err){
    if(err) {
      console.error(err);
      return;
    }
    res.redirect('/profesores')
  })
})


module.exports = router;
