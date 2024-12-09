const path = require('path');
const express = require('express');
const {engine} = require('express-handlebars');
const app = express();
const port = 3000;


const route = require('./routes');
// Xử lý static file
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
  extended: true
}));
// middleware để xữ lý dữ liệu dùng phương thức post
app.use(express.json());


//template engine
app.engine('hbs', engine({
    extname: '.hbs',
  })
)
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Routes init
route(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
