// PAGE DE CONNEXION
exports.getLoginPage = async (req, res) => {
    
    return res.render('login')
}

//====================================================== PAGE D'INSCRIPTION
//GET
exports.getRegisterPage = async (req, res) => {

    return res.render('register')
}

//POST
exports.postRegisterPage = async (req, res) => {

    const { lastname, firstname, email, password } = req.body
    // Si l'email existe
    const findEmail = await querysql("SELECT COUNT(*) AS cnt FROM user WHERE email = ?", email)
    
    if (findEmail[0].cnt > 0) {
        console.log("Email déjà utilisé");
        return res.redirect('/auth/register')
    }

    // Ajouter un utilisateur
    try {

    } catch (err) {
        res.status(400).json({ message: err })
    }
}