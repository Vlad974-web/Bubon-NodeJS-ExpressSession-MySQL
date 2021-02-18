const router = require('express').Router()
const authController = require('../controllers/authController')

/* ========================================================== PAGE DE CONNEXION ============================================================================ */
// GET
router.get('/login', authController.getLoginPage)

// POST
router.post('/login', authController.postLoginPage)


/* ========================================================== PAGE D'INSCRIPTION ============================================================================ */
// GET
router.get('/register', authController.getRegisterPage)

//POST
router.post('/register', authController.postRegisterPage)


module.exports = router