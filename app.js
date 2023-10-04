const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

// Configura a pasta de views e o template engine Mustache
app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

// Serve os arquivos estáticos a partir da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configura o body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  }

  res.redirect('/'); // Redireciona para a página inicial
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
