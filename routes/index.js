var express = require('express');
var router = express.Router();
var EstadisticasModel = require('../models/estadisticas/Estadisticas');
var controller = require('../controllers/Estadisticas');
/* GET home page. */
router.get('/total', function(req, res, next) {
  EstadisticasModel.getTotal(function (err, data) {

    if(typeof data !== 'undefined'){
      res.json(data);
    }else{
      res.json(404, {"msg": "NotFound"});
    }
  });
});

router.get('/:date/:rasp', function (req, res) {
  var data = {
      date: req.params.date,
      rasp: req.params.rasp
  };

  if(isNaN(data.rasp)){

    EstadisticasModel.countByDateAndRasp(data, function (err, data) {
        if(typeof data !== 'undefined'){
          res.json(data);
        }else{
          res.json(500, 'Error');
        }
    })
  }
});

router.post('/month', function (req, res) {
    var data = {
        month: req.body.month
    };

    EstadisticasModel.getStadisticsByRaspAndMonth(data, function (err, response) {

        if(response.length == 0){
            EstadisticasModel.getAlldata(data, function (err, result) {
                if(result.length === 0) {
                    for(var i=0; i <response.length; i++){
                        EstadisticasModel.postStadisticsByMonth(response[i], function (err, data) {});
                    }
                    res.json({message: 'datos ingresados', status: 200}, 200);
                }else{
                    res.json({message: 'Se han encotrado los siguientes datos', status: 200, res: result}, 200);
                }
            });
        }
    });
});

router.post('/', function (req, res) {
    var data = {
        month: req.body.month
    };

    EstadisticasModel.countStadisticsByMonth(data, function (err, data) {
        if(typeof data !== 'undefined'){
            res.json(data);
        }else{
            res.json(500, 'Error');
        }
    })

});

router.post('/week-without-fds', function (req, res) {
    var data = {
        month: req.body.month
    };

    EstadisticasModel.countStadisticsByMonthWithoutFDS(data, function (err, data) {
        if(typeof data !== 'undefined'){
            res.json(data);
        }else{
            res.json(500, 'Error');
        }
    })


});


router.post('/week-fds', function (req, res) {
    var data = {
        month: req.body.month
    };
    EstadisticasModel.countStadisticsByMonthFDS(data, function (err, data) {
        if(typeof data !== 'undefined'){
            res.json(data);
        }else{
            res.json(500, 'Error');
        }
    })

});

router.post('/prom-day', function (req, res) {
    var data = {
        month: req.body.month
    };
    EstadisticasModel.promDay(data, function (err, data) {
        if(typeof data !== 'undefined'){
            res.json(data);
        }else{
            res.json(500, 'Error');
        }
    })

});


router.post('/prom-day-without-fds', function (req, res) {
    var data = {
        month: req.body.month
    };
    EstadisticasModel.promDayWithoutFDS(data, function (err, data) {
        if(typeof data !== 'undefined'){
            res.json(data);
        }else{
            res.json(500, 'Error');
        }
    })

});

router.post('/prom-day-fds', function (req, res) {
    var data = {
        month: req.body.month
    };
    EstadisticasModel.promDayFDS(data, function (err, data) {
        if(typeof data !== 'undefined'){
            res.json(data);
        }else{
            res.json(500, 'Error');
        }
    })

});

router.post('/generateExcel', function (req, res) {
    var data = {
        month: req.body.month
    };
    EstadisticasModel.getAlldata(data, function (err, data) {
        if(typeof data !== 'undefined'){
            res.json(data);
        }else{
            res.json(500, 'Error');
        }
    })
});

module.exports = router;
