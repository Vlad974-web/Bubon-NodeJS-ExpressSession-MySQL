const router = require('express').Router()
const authController = require('../controllers/authController')

/* ===================== LOGIN PAGE =============== */
// GET
router.get('/login', authController.getLoginPage)

module.exports = router