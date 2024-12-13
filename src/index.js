const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const {engine} = require('express-handlebars');


const sortMiddleware = require('./app/middlewares/sortMiddleware');

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.Connect();

// Xử lý static file
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
  extended: true
}));
// middleware để xữ lý dữ liệu dùng phương thức post
app.use(express.json());
// dùng để thực hiện phương thức mà form không hỗ trợ
app.use(methodOverride('_method'));

//custom Middleware
app.use(sortMiddleware);

//template engine
app.engine('hbs', engine({
    extname: '.hbs',
    helpers: require('./helpers/handlebars'),
  })
)
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Routes init
route(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
