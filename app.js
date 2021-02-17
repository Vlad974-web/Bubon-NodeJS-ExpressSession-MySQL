const express  = require('express')
,     app = express()
,     port = 3500;

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