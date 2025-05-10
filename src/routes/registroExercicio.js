var express = require("express");
var router = express.Router();

var regisExercicioController = require("../controllers/regisExercicioController");

router.post("/pegarExercicio", function (req, res) {
    regisExercicioController.pegarExercicio(req, res);
})

module.exports = router;