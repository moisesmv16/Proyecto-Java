export default class addTodo{
    constructor(){
        this.btn = document.getElementById('add');
        this.titulo = document.getElementById('title');
        this.descripcion = document.getElementById('description');
    }
    onClick(callback){
        this.btn.addEventListener('click', () => {
            if (this.title.value === '' || this.description.value === '') {
              console.error('Faltan campos');
            } else {
              callback(this.title.value, this.description.value);
            }
          });
          
    }
}