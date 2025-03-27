document.addEventListener('DOMContentLoaded', function(){
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const table = document.getElementById('table');
    const alert = document.getElementById('alert');
    const btn = document.getElementById('add');

    function addTodo(){
        if(title.value == '' || description.value == ''){
            alert.classList.remove('d-none');
            alert.innerHTML = 'Añada algo en el campo';
            return;
        }
        alert.classList.add('d-none');
        const row = table.insertRow();
        row.innerHTML = `
    <td>${title.value}</td>
    <td>${description.value}</td>
    <td><input type="checkbox"></td>
    <td class="text-right">
        <button class="btn btn-primary mb-1">
            <i class="fa fa-pencil"></i>
        </button>
        <button class="btn btn-danger mb-1 ml-1">
            <i class="fa fa-trash"></i>
        </button>
    </td>
`;
    // Limpiar los campos después de agregar
    title.value = '';
    description.value = '';

    }
    btn.onclick = addTodo;
});



