var express = require('express');
var router = express.Router();
const controllers = require('../controllers/controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/personas',controllers.listapersonas);
router.get('/agregar',controllers.agregarpersona);
router.post('/agregar',controllers.postAgregarpersona);
router.get('/edit/:id', controllers.geteditarpersona);
router.post('/update/:id', controllers.postupdatepersona);
router.get('/delete/:id', controllers.getdeletepersona);
router.get('/delete/:id', controllers.postdeletepersona);


module.exports = router;
