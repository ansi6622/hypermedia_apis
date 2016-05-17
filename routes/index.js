var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var firecrackers = [
  { id: 1, name: "Roman Candle" },
  { id: 2, name: "M80" },
  { id: 3, name: "Mortars" },
]

router.get('/api', function(req, res, next) {
  res.json({
    firecrackers: `${req.protocol}://${req.get('host')}/api/firecrackers`
  })
});

router.get('/api/firecrackers', function(req, res, next) {
  var output = firecrackers.map(function (firecracker) {
    var links = {
      get: `${req.protocol}://${req.get('host')}/api/firecrackers/${firecracker.id}`
    }

    if (firecracker.id == 2) {
      links.update = `${req.protocol}://${req.get('host')}/api/firecrackers/${firecracker.id}`
    }
    return {
      attributes: firecracker,
      links: links
    }
  })

  res.json(output)
});

router.get('/api/firecrackers/:id', function(req, res, next) {
  var firecracker = firecrackers.find(function (firecracker) {
    return firecracker.id == req.params.id
  })

  res.json({
    attributes: firecracker,
    links: {
      self: `${req.protocol}://${req.get('host')}/api/firecrackers/${firecracker.id}`
    }
  })
});

module.exports = router;
