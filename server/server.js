require('dotenv').config();

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);
const app = require('express')();
const server = require('http').Server(app);
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const bundleURL = process.env.NODE_ENV === 'production' ? '/bundle.js' : process.env.DEV_BUNDLE || 'http://localhost:8080/bundle.js';

app.set('view engine', 'ejs');

app.use(cookieSession({
  secret: process.env.SESSION_SECRET || 'development'
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Home page
// app.get("/", (req, res) => {
//   console.log('req session', req.session.user_id);
//   res.render("index");
// });

app.get('/', function (req, res) {
  if (req.session.user_id) {
    console.log('reqsession', req.session);
    res.render('app', {
      bundleURL
    });
  } else {
    res.render('index');
  }
});

app.use('/login', loginRouter(knex));
app.use('/register', registerRouter(knex));

server.listen(process.env.PORT || 3000, () => {
  const address = server.address();
  console.log(`Server running on port ${address.port}`);
});
