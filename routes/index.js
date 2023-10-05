var express = require('express');
const mustacheExpress = require('mustache-express');
var Task = require("../model/Tasks.js")
var TaskSchema = require("../validators/TaskValidator")
const Joi = require("joi") // Valida dados de solicitações HTTP
var router = express.Router();
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

  res.redirect('/tasks'); // Redireciona para a página das task
});

/* GET home page. */
router.get('/tasks', function(req, res, next) {
  if (Task.list().length == 0) {
    // Criar um Feedback pro user
  }

  let obj = Task.getElementById(req.query.tid);
  res.render('home', { tasks: Task.list(), task: obj });
});

router.post("/tarefas", function (req, res){
    const {error, value} = TaskSchema.validate(req.body);
    if (error) {
      res.render('home', { tasks: Task.list(), erro: "Dados incompletos" });
      return;
    }
    
    const {id, nome} = value
    if (id === undefined) {
      //Inserir
      Task.new(nome);
    } else {
      //Alterar
      Task.update(id, nome);
    }
    
    res.redirect("/task");
})

router.get("/tarefas/del/:id", function(req, res){
  const {id} = req.params;
  const {error, value} = Joi.number().integer().greater(0).validate(id)

  if (error || !Task.delete(value)) {
    res.send("Falha ao excluir uma tarefa");
    return;
  }
  res.redirect("/task");
})

module.exports = router;
