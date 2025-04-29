import AddTodo from './components/add-todo.js';
import Modal from './components/modal.js';
import Filters from './components/filters.js';

export default class View {
  constructor() {
    this.model = null;
    this.table = document.getElementById('table');
    this.addTodoForm = new AddTodo();
    this.modal = new Modal();
    this.filters = new Filters();

    this.addTodoForm.onClick((title, description, priority) => this.addTodo(title, description, priority));
    this.modal.onClick((id, values) => this.editTodo(id, values));
    this.filters.onClick((filters) => this.filter(filters));
  }

  setModel(model) {
    this.model = model;
  }

  render() {
    const todos = this.model.getTodos();
    todos.forEach((todo) => this.createRow(todo));
  }

  filter(filters) {
    const { type, words } = filters;
    const [, ...rows] = this.table.getElementsByTagName('tr');
    for (const row of rows) {
      const [title, description, priority, completed] = row.children;
      let shouldHide = false;

      if (words) {
        shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words);
      }

      const shouldBeCompleted = type === 'completed';
      const isCompleted = completed.children[0].checked;

      if (type !== 'all' && shouldBeCompleted !== isCompleted) {
        shouldHide = true;
      }

      if (shouldHide) {
        row.classList.add('d-none');
      } else {
        row.classList.remove('d-none');
      }
    }
  }

  addTodo(title, description, priority) {
    const todo = this.model.addTodo(title, description, priority);
    this.createRow(todo);
  }

  toggleCompleted(id) {
    this.model.toggleCompleted(id);
  }

  editTodo(id, values) {
    this.model.editTodo(id, values);
    const row = document.getElementById(id);
    row.children[0].innerText = values.title;
    row.children[1].innerText = values.description;

    // Actualizar prioridad con badge
    let priorityClass;
    switch (values.priority) {
      case 'Alta':
        priorityClass = 'badge badge-danger';
        break;
      case 'Media':
        priorityClass = 'badge badge-warning';
        break;
      case 'Baja':
        priorityClass = 'badge badge-success';
        break;
      default:
        priorityClass = 'badge badge-secondary';
    }
    row.children[2].innerHTML = `<span class="${priorityClass}">${values.priority}</span>`;

    row.children[3].children[0].checked = values.completed;
  }

  removeTodo(id) {
    this.model.removeTodo(id);
    document.getElementById(id).remove();
  }

  createRow(todo) {
    const row = this.table.insertRow();
    row.setAttribute('id', todo.id);

    let priorityClass;
    switch (todo.priority) {
      case 'Alta':
        priorityClass = 'badge badge-danger';
        break;
      case 'Media':
        priorityClass = 'badge badge-warning';
        break;
      case 'Baja':
        priorityClass = 'badge badge-success';
        break;
      default:
        priorityClass = 'badge badge-secondary';
    }

    row.innerHTML = `
      <td>${todo.title}</td>
      <td>${todo.description}</td>
      <td class="text-center"><span class="${priorityClass}">${todo.priority}</span></td>
      <td class="text-center"></td>
      <td class="text-right"></td>
    `;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.onclick = () => this.toggleCompleted(todo.id);
    row.children[3].appendChild(checkbox);

    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-primary', 'mb-1');
    editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
    editBtn.setAttribute('data-toggle', 'modal');
    editBtn.setAttribute('data-target', '#modal');
    editBtn.onclick = () => this.modal.setValues({
      id: todo.id,
      title: row.children[0].innerText,
      description: row.children[1].innerText,
      priority: todo.priority,
      completed: row.children[3].children[0].checked,
    });
    row.children[4].appendChild(editBtn);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
    removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
    removeBtn.onclick = () => this.removeTodo(todo.id);
    row.children[4].appendChild(removeBtn);
  }
}
