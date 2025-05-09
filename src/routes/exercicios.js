var express = require("express");
var router = express.Router();

var exercicioController = require("../controllers/exercicioController");

router.post("/cadastrar", function (req, res) {
    exercicioController.cadastrar(req, res);
})

module.exports = router;