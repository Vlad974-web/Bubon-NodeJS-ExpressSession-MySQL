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

    // Si l'email existe
    // Vérifier le mot de passe
    const user = await querysql("SELECT userID, firstname, lastname, email, password FROM user WHERE email = ?", email)
    const passwordCheck = await bcrypt.compare(password, user[0].password)

    if (!passwordCheck) {
        req.flash("message", "Mot de passe incorrecte")
        return res.redirect('/auth/login')
    } else {
        req.session.userId = user[0].userID;
        req.session.user = {
            id: user[0].userID,
            firstname: user[0].firstname,
            lastname: user[0].lastname,
            email: user[0].email
        };
        return res.redirect('/dashboard')
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


//======================================================= PAGE DECONNECTÉ
// GET
exports.getLogoutPage = async (req, res) => {
    req.session.destroy(function (err) {
        res.redirect('/auth/login')
    })
}