const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

let contadorGlobal = 0;

// Configura a pasta de views e o template engine Mustache
app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

// Serve os arquivos estáticos a partir da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));
// Cookie
app.use(cookieParser());

// Configura o body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Contagem de todas as requisições
app.use((req, res, next) => {
  contadorGlobal++;
  next();
});

app.use(session({
  secret: 'admin', 
  resave: false,
  saveUninitialized: true
}));

// Rota para a página inicial
app.get('/', (req, res) => {
  const nomeUsuario = req.session.nomeUsuario || 'Convidado'; // Obtem o nome da sessão
  res.render('index', { nomeUsuario });
});

app.post('/salvauser', (req, res) => {
  const { nome } = req.body;

  if (nome) {
    req.session.nomeUsuario = nome; // Armazena o nome do usuário na sessão
    req.session.userId = nome;
  }

  res.redirect('/tasks'); // Redireciona para a página inicial
});

// Rota para gerar um número aleatório e salvar em um cookie
app.get('/random', (req, res) => {
  // Verifica se o cookie já existe
  const randomNumber = req.cookies.randomNumber || Math.floor(Math.random() * 1000);

  // Salva o número aleatório em um cookie com um nome "randomNumber"
  res.cookie('randomNumber', randomNumber);

  // res.send(`Número aleatório: ${randomNumber}`);
  res.render('cookie', { randomNumber });
});

// Rota para /contador 
app.get('/contador', (req, res) => {
  // Verifica se o cookie contadorUsuario já existe para o usuário atual
  const contadorUsuario = req.cookies.contadorUsuario || 0;

  // Incrementa o contador do usuário e salva no cookie
  res.cookie('contadorUsuario', parseInt(contadorUsuario) + 1);

  // res.send(`Contador Global: ${contadorGlobal}<br>Contador do Usuário: ${contadorUsuario}`);
  res.render('contador', { contadorGlobal, contadorUsuario});
});

const router = require('./routes');
app.use('/', router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
