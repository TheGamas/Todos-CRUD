import Model from './Model.js';
import View from './View.js';


document.addEventListener('DOMContentLoaded', function (){
    let model = new Model();
    let view = new View(model);
    let currentId = JSON.parse(localStorage.getItem('currentId'));
    let titulo = document.getElementById('title');
    let desc = document.getElementById('description');
    
    if ( ! currentId){
        currentId = 1;
    }

    document.getElementById('add').addEventListener('click', () =>{
        model.createTodo(currentId, titulo.value, desc.value);
        view.createTodo(currentId, titulo.value, desc.value);
        currentId++;
        localStorage.setItem('currentId', JSON.stringify(currentId));
    })
})

