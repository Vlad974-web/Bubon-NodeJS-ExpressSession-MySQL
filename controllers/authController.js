const bcrypt = require('bcrypt')

// PAGE DE CONNEXION
exports.getLoginPage = async (req, res) => {
    
    return res.render('login')
}

//====================================================== PAGE D'INSCRIPTION
//GET
exports.getRegisterPage = async (req, res) => {

    return res.render('register', {message: req.flash("message")})
}

//POST
exports.postRegisterPage = async (req, res) => {

    const { lastname, firstname, email, password } = req.body
    // Si l'email existe
    const findEmail = await querysql("SELECT COUNT(*) AS cnt FROM user WHERE email = ?", email)
    
    if (findEmail[0].cnt > 0) {
        // Méthode FLASH
        req.flash("message", "L'email est déjà utilisé !")
        return res.redirect('/auth/register')
    }

    // Ajouter un utilisateur
    try {

        // Hasher le mot de passe
        const meliodas = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, meliodas)

        await querysql(
            'INSERT INTO user (firstname, lastname, email, password) VALUES (?, ?, ?, ?)',
            [firstname, lastname, email, hash],
            (err, result) => {
                if (err) {
                    return res.redirect('/auth/register')
                }
                return res.redirect('/auth/login')
            }
        )

    } catch (err) {
        res.status(400).json({message: err})
    }
}