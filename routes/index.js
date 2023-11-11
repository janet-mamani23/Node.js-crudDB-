var express = require('express');
var router = express.Router();
const controllers = require('../controllers/controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profesores',controllers.listaprofesores);
router.get('/agregar',controllers.agregarprofesores);
router.post('/agregar',controllers.postagregarprofesores);
router.get('/edit/:id', controllers.geteditarprofesores);
router.post('/update/:id', controllers.postupdateprofesores);
router.get('/delete/:id', controllers.getdeleteprofesores);


module.exports = router;
