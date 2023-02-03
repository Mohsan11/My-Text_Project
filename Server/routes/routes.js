const express = require("express");
const router = require("express").Router();
const { textGeneration } = require("../Controller/Controller");
router.post("/textgeneration", textGeneration);
module.exports = router;
