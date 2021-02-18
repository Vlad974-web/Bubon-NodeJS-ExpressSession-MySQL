const express  = require('express')
,     app = express()
,     util = require('util')
,     mysql = require('mysql')
,     session = require('express-session')
,     flash = require('connect-flash')
,     port = 3500;


// DotEnv
require('dotenv').config()

// MySQL
const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }
)
// SE CONNECTER SUR MySQL
db.connect(
  (err) => {
    if (err) { throw err}
    console.log('Connecté au serveur MySQL');
  }
);
global.querysql = util.promisify(db.query).bind(db)

// EXPRESS-SESSION
app.use(session({
  name: 'biscuit',
  secret: 'secret',
  resave: false,              // forcer enregistrement
  saveUninitialized: true,    // forcer même si n'était pas initialisé est bien il va être quand même enregistrer
  cookie: {
    maxAge: 1000 * 60 * 60 * 24     // Au bout de 24h, on demande que l'utilisateur soit connecte.
  }
}))

// EJS
app.set('view engine', 'ejs');

// Activer les messages Flash
app.use(flash())


// Static folder
app.use(express.static('public'));


// Middleware - BodyParser
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Routes
const index = require('./routes/indexRoute')
const auth = require('./routes/authRoute')
const dashboard = require('./routes/dashboardRoute')


app.use('/auth', auth)
app.use('/dashboard', dashboard)
app.use('/', index)

app.get('*', function(req, res){
  res.render('404');
});


// Listen
app.listen(port, () => {
  console.log(`Le serveur tourne sur le port: ${port}`);
});