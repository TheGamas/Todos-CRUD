import Model from './Model.js';
import View from './View.js';


document.addEventListener('DOMContentLoaded', function (){
    let model = new Model();
    let view = new View(model);
    let currentId = JSON.parse(localStorage.getItem('currentId'));
    let titulo = document.getElementById('title');
    let desc = document.getElementById('description');
    
    if ( ! currentId || model.isEmpty()){
        currentId = 1;
    }

    document.getElementById('add').addEventListener('click', () =>{
        
        if (formsEmpty()){
            view.showAlert(true);
            return;
        }
        view.showAlert(false);

        
        model.createTodo(currentId, titulo.value, desc.value, false);
        view.createTodo(currentId, titulo.value, desc.value, false);
        currentId++;
        localStorage.setItem('currentId', JSON.stringify(currentId));
    })
    
    function formsEmpty(){
        return titulo.value === '' || desc.value === '';
    }
})



