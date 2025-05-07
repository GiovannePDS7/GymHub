var express = require("express");
var router = express.Router();

var treinoController = require("../controllers/treinoController");

router.post("/cadastrar", function (req, res) {
    treinoController.cadastrar(req, res);
})
