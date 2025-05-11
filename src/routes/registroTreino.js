var express = require("express");
var router = express.Router();

var regisTreinoController = require("../controllers/regisTreinoController");

router.post("/pegarTreino", function (req, res) {
    regisTreinoController.pegarTreino(req, res);
})
router.post("/registrarTreino", function (req, res) {
    regisTreinoController.registrarTreino(req, res);
})

module.exports = router;