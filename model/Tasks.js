let ids = 0; // id das tarefas
let tasks = []; // array que armazena as tasks

// Exporta o objeto para que seja disponível em outros módulos
module.exports = {
    new(name) { // Adiciona
        let task = {id: ++ids, name: name};
        tasks.push(task);
        return task;
    },
    update (id, name) { // Edita
        let pos = this.getPositionById(id)
        if (pos >= 0) { // Se encontrar a tarefa
            tasks[pos].name = name;
        }
    },
    list() { // lista
        return tasks;
    },
    getElementById(id) { // Busca a tarefa por id
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            return tasks[pos];
        }
        return null;
    },
    getPositionById(id) {
        for (let i = 0; i<tasks.length; i++) {
            if (tasks[i].id == id) {
                return i;
            }
        }
        return -1;
    },
    delete(id) { // Exclui
        let i = this.getPositionById(id);
        if (i >= 0) {
            tasks.splice(i, 1);
            return true;
        }
        return false; 
    }
}