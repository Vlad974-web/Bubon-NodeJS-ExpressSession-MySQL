const router = require('express').Router()
const dashboardController = require('../controllers/dashboardController')

/* ========================================================== PAGE TABLEAU DE BORD ============================================================================ */
// GET
router.get('/', dashboardController.getDashboardPage)


module.exports = router