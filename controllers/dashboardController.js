exports.getDashboardPage = async (req, res) => {
    // L'utilisateur connecté et authentifier
    const user = req.session.user
    res.render('dashboard', {user})
}