import addTodo from "./components/add-todo.js";

export default class View{
    constructor(){
        this.model = null;
        this.table = document.getElementById('table');
        this.addTodoForm = new addTodo();

        this.addTodoForm.onClick((titulo, descripcion)=>this.addTodo(titulo, descripcion));


    }
    setModel(model){
        this.model = model;
    }
    addTodo(titulo, descripcion){
       const todo = this.model.addTodo(titulo, descripcion); 
       this.createRow(todo);
    }
    removeTodo(id){
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    createRow(todo){
        const row = this.table.insertRow(); // ✅ así sí funciona
        row.setAttribute('id', todo.id);
        row.innerHTML = `
    <td>${todo.titulo}</td>
    <td>${todo.descripcion}</td>
    <td><input type="checkbox"></td>
    <td class="text-right">
        <button class="btn btn-primary mb-1">
            <i class="fa fa-pencil"></i>
        </button>
    </td>

`;
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn','btn-danger','mb-1');
    removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
    removeBtn.onclick = () =>this.removeTodo(todo.id);
        row.children[3].appendChild(removeBtn);
    }
}