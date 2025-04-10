export default class Model{
    constructor(){
        this.view = null;
        this.todos = []; 
        this.currentId = 1;

    }
    setView(view){
        this.view = view;
    }
    getTodos(){
        return this.todos;
    }
    addTodo(titulo, descripcion){
        const todo ={
            id: this.currentId++,
            titulo,
            descripcion,
            completado: false, 
        }
        this.todos.push(todo);
        console.log(this.todos);

        return {...todo};
    }
    removeTodo(id) {
        const index = this.todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          this.todos.splice(index, 1);
        }
      }
      
}