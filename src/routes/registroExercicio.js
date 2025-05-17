var express = require("express");
var router = express.Router();

var regisExercicioController = require("../controllers/regisExercicioController");

router.post("/pegarExercicio", function (req, res) {
    regisExercicioController.pegarExercicio(req, res);
})
router.post("/registrarExercicio", function (req, res) {
    regisExercicioController.registrarExercicio(req, res);
})
router.get("/pegarUltimosDados/:idTreino/:nomeExercicio/:intervalo", function (req, res) {
    regisExercicioController.pegarUltimosDados(req, res);
})
router.get("/tempo-real/:idTreino/:nomeExercicio/:intervalo", function (req, res) {
    regisExercicioController.pegarDadosTempoReal(req, res);
})

module.exports = router;