let ids = 0; // id das tarefas
let tasks = []; // array que armazena as tasks

// Exporta o objeto para que seja disponível em outros módulos
module.exports = {
    new(userId, name) { // Adiciona
        let task = {id: ++ids, userId, name: name};
        tasks.push(task);
        return task;
    },
    update (id, userId, name) { // Edita
        let pos = this.getPositionById(id, userId)
        if (pos >= 0) { // Se encontrar a tarefa
            tasks[pos].name = name;
        }
    },
    list(userId) { // lista
        return tasks.filter((task) => task.userId === userId);
    },
    getElementById(id, userId) { // Busca a tarefa por id
        let pos = this.getPositionById(id, userId)
        if (pos >= 0) {
            return tasks[pos];
        }
        return null;
    },
    getPositionById(id, userId) {
        for (let i = 0; i<tasks.length; i++) {
            if (tasks[i].id == id && tasks[i].userId === userId) {
                return i;
            }
        }
        return -1;
    },
    delete(id, userId) { // Exclui
        let i = this.getPositionById(id, userId);
        if (i >= 0) {
            tasks.splice(i, 1);
            return true;
        }
        return false; 
    }
}