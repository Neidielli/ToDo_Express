var express = require('express');
var Task = require("../model/Tasks.js")
var TaskSchema = require("../validators/TaskValidator")
const Joi = require("joi") // Valida dados de solicitações HTTP
var router = express.Router();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

// Configura o body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'admin', 
  resave: false,
  saveUninitialized: true
}));

/* GET home page. */
router.get('/tasks', function(req, res, next) {
  if (Task.list(req.session.userId).length == 0) {
    // Criar um Feedback pro user
    Task.new(req.session.userId, "Tarefa Default");
  }

  const nomeUsuario = req.session.nomeUsuario;
  let obj = Task.getElementById(req.query.tid, req.session.userId);
  res.render('home', { tasks: Task.list(req.session.userId), task: obj, nomeUsuario});
});

router.post("/tarefas", function (req, res){
    const {error, value} = TaskSchema.validate(req.body);
    if (error) {
      res.render('home', { tasks: Task.list(req.session.userId), erro: "Dados incompletos" });
      return;
    }
    
    const {id, nome} = value
    if (id === undefined) {
      //Inserir
      Task.new(req.session.userId, nome);
    } else {
      //Alterar
      Task.update(id, req.session.userId, nome);
    }
    
    res.redirect("/tasks");
})

router.get("/tarefas/del/:id", function(req, res){
  const {id} = req.params;
  const {error, value} = Joi.number().integer().greater(0).validate(id)

  if (error || !Task.delete(value, req.session.userId)) {
    res.send("Falha ao excluir uma tarefa");
    return;
  }
  res.redirect("/tasks");
})

module.exports = router;
