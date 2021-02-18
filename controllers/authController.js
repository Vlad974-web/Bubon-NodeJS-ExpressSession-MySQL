const bcrypt = require('bcrypt')

//======================================================= PAGE DE CONNEXION
// GET
/* const {query} = require('express') */

exports.getLoginPage = async (req, res) => {
    
    return res.render('login', {message: req.flash("message")})
}

// POST
exports.postLoginPage = async (req, res) => {
    // RÉCUPERER l'email et password
    const { email, password } = req.body
    
    // Si l'emai n'existe pas
    const findEmail = await querysql("SELECT COUNT(*) AS cnt FROM user WHERE email = ?", email)

    if (!findEmail[0].cnt > 0) {
        // Méthode FLASH
        req.flash("message", "Aucun utilisateur avec cet email")
        return res.redirect('/auth/login')
    }
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
                    // AFFICHER LE MESSAGE "INSCRIPTION NE PAS RÉUSSI"
                    req.flash("message", `il y a une erreur ${err}`)
                    return res.redirect('/auth/register')
                }
                // AFFICHER LE MESSAGE "INSCRIPTION RÉUSSI"
                req.flash("message", "Inscription avec succés ! Vous pouvez-vous connecter.")
                return res.redirect('/auth/login')
            }
        )

    } catch (err) {
        res.status(400).json({message: err})
    }
}