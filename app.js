const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const Users = require('./model/usuario');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('Public'));
app.set('view engine', 'hbs');
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    secret: 'segredo_super_secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 } // 1 minuto de sessão
}));

function checkLogin(req, res, next) {
if (req.session.logado) {
next();
} else {
res.redirect('/login');
}
}

app.get('/', checkLogin, (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/invalido', (req, res) => {
    res.render('invalido');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.post('/login', async (req, res) => {
    const { nome, senha } = req.body;

    busca = await Users.buscar({nome:nome},{senha:senha});

    if (busca.length > 0) {
    req.session.logado = true;
    res.redirect('/');
    } else {
    res.redirect('/invalido');
    }
});

http.createServer(app).listen(3000);