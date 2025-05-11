var express = require("express");
var router = express.Router();

var regisExercicioController = require("../controllers/regisExercicioController");

router.post("/pegarExercicio", function (req, res) {
    regisExercicioController.pegarExercicio(req, res);
})
router.post("/registrarExercicio", function (req, res) {
    regisExercicioController.registrarExercicio(req, res);
})

module.exports = router;