const router = require('express').Router()
const authController = require('../controllers/authController')

/* ========================================================== PAGE DE CONNEXION ============================================================================ */
// GET
router.get('/login', authController.getLoginPage)


/* ========================================================== PAGE D'INSCRIPTION ============================================================================ */
// GET
router.get('/register', authController.getRegisterPage)

//POST
router.post('/register', authController.postRegisterPage)


module.exports = router