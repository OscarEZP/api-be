var express = require('express');
var router = express.Router();
var EstadisticasModel = require('../models/estadisticas/Estadisticas');
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

router.get('/month/:month/:rasp', function (req, res) {
    var data = {
        month: req.params.month,
        rasp: req.params.rasp
    };

    if(isNaN(data.rasp)){

        EstadisticasModel.countByMonthRasp(data, function (err, data) {
            if(typeof data !== 'undefined'){
                for(var i=0; i <data.length; i++){

                    EstadisticasModel.postStadisticsByMonth(data[i], function (err, data) {});
                }
            }else{
                res.json(500, 'Error');
            }
        })
    }
});


router.get('/:month', function (req, res) {
    var data = {
        month: req.params.month
    };

    if(isNaN(data.rasp)){

        EstadisticasModel.countStadisticsByMonth(data, function (err, data) {
            if(typeof data !== 'undefined'){
                res.json(data);
            }else{
                res.json(500, 'Error');
            }
        })
    }
});

router.get('/fds/:month/', function (req, res) {
    var data = {
        month: req.params.month
    };
    console.log(data);
    return;
    if(isNaN(data.rasp)){

        EstadisticasModel.countStadisticsByMonth(data, function (err, data) {
            if(typeof data !== 'undefined'){
                res.json(data);
            }else{
                res.json(500, 'Error');
            }
        })
    }
});

module.exports = router;
