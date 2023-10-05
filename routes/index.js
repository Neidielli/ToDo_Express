var express = require('express');
var Task = require("../model/Tasks.js")
var TaskSchema = require("../validators/TaskValidator")
const Joi = require("joi") // Valida dados de solicitações HTTP
var router = express.Router();

/* GET home page. */
router.get('/tasks', function(req, res, next) {
  if (Task.list().length == 0) {
    // Criar um Feedback pro user
    Task.new("Tarefa Default");
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
