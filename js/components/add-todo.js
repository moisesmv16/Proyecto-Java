export default class addTodo {
  constructor() {
      this.btn = document.getElementById('add');
      this.titulo = document.getElementById('title');
      this.descripcion = document.getElementById('description');
  }

  onClick(callback) {
      this.btn.addEventListener('click', () => {
          if (this.titulo.value === '' || this.descripcion.value === '') {
              console.error('Faltan campos');
          } else {
              callback(this.titulo.value, this.descripcion.value);
          }
      });
  }
}
