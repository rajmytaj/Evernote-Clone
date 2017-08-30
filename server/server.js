require('dotenv').config();

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);
const app = require('express')();
const server = require('http').Server(app);
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const bundleURL = process.env.NODE_ENV === 'production' ? '/bundle.js' : process.env.DEV_BUNDLE || 'http://localhost:8080/bundle.js';
const flash = require("connect-flash");

const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const currentUserRouter = require('./routes/currentUser');
const logoutRouter = require('./routes/logout');


app.set('view engine', 'ejs');

app.use(cookieSession({
  secret: process.env.SESSION_SECRET || 'development'
}));

app.use(flash());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// app.use(express.static('public'));

app.use((req, res, next) => {
  res.locals.errors = req.flash('errors');
  next();
});

app.use('/login', loginRouter(knex));
app.use('/register', registerRouter(knex));

// Home page
// app.get("/", (req, res) => {
//   console.log('request', req);
//   res.render("index");
// });

app.get('/', function (req, res) {
  if (req.session.user_id) {
    console.log('req.session', req.session);
    res.render('app', {
      bundleURL
    });
  } else {
    res.render('index');
  }
});
// app.get('/', function(req, res){
//   // check if the user's credentials are saved in a cookie //
//   console.log('req cookies: ', req.cookies);
// 		if (req.cookies.user == undefined || req.cookies.pass == undefined){
// 			res.render('index', { title: 'Hello - Please Login To Your Account' });
// 		}	else{
// 	// attempt automatic login //
//       res.render('app', {
//         bundleURL
//       })
// 		}
// 	});
// app.get('/', function(req, res){
//   if (!loggedIn) {
//     return res.status(401).send();
//   }
// })



server.listen(process.env.PORT || 3000, () => {
  const address = server.address();
  console.log(`Server running on port ${address.port}`);
});
