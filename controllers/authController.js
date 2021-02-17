// PAGE DE CONNEXION
exports.getLoginPage = async (req, res) => {
    
    return res.render('login')
}

// PAGE D'INSCRIPTION
exports.getRegisterPage = async (req, res) => {

    return res.render('register')
}