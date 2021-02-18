const express  = require('express')
,     app = express()
,     util = require('util')
,     mysql = require('mysql')
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

// EJS
app.set('view engine', 'ejs'); 


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