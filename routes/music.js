const express = require("express");
const router = express.Router();
const { status, login, logout, refresh, search } = require('../controllers/music');

router.get("/login", login);
router.get("/status", status);
router.get("/logout", logout);
router.get('/refresh', refresh);
router.get("/", search);

module.exports = router;