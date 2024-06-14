export default class View{
    constructor(model){
        this.table = document.getElementById('table');
        this.model = model;
        this.loadView();

    }

    loadView(){
        this.model.getTodos().forEach(element => {
            this.createTodo(element.id, element.title, element.description)
        });
    }
    
    


    createTodo(id, title, description){
        this.table.insertAdjacentHTML('beforeend', this.createRow(id, title, description));
        this.createModal(id);
        document.getElementById(`update1-${id}`).addEventListener('click', () => this.updateTodo(id));
        document.getElementById(`delete-${id}`).addEventListener('click', () => this.removeTodo(id));
        
        document.getElementById(`button-modal-${id}`).addEventListener('click', () => {
            
            let title = document.getElementById('modal-title').value;
            let description = document.getElementById('modal-description').value;
            this.updateRow(id, title, description);
            document.getElementById(`modal-${id}`).style.display = 'none';
            this.model.updateTodo(id, title, description)
        })
    }

    removeTodo(id){
        document.getElementById(`row-${id}`).remove();
        this.model.removeTodo(id);
    }

    updateTodo(id){
        document.getElementById(`modal-${id}`).style.display = 'flex';
    }


    
    createRow(id, title, description){
        return `<tr id="row-${id}">
                    <td id="title-${id}">${title}</td>
                    <td id="description-${id}">${description}</td>
                    <td>
                        <input type="checkbox" id="task-uncompleted">
                    </td>
                    <td class="td-buttons">
                        <button class="update-button" id="update1-${id}">Update</button>
                        <button class="delete-button" id="delete-${id}">Delete</button>
                    </td>
                </tr>`
    }


    createModal(id){
        document.body.insertAdjacentHTML('afterbegin', 
            `<div class="update-modal" id="modal-${id}">
                <div class="form">
                    <div>
                        <label>Title</label>
                        <input type="text" name="title" id="modal-title">
                    </div>
                    <div>
                        <label>Description</label>
                        <input type="text" name="description"id="modal-description">
                    </div>
                    <button id="button-modal-${id}">Update</button>
                </div>
            </div>`);
    }

    removeModal(id){
        document.getElementById(`modal${id}`).remove()
    }

    updateRow(id, title, description){
        document.getElementById(`title-${id}`).innerHTML = title;
        document.getElementById(`description-${id}`).innerHTML = description;
    }

    
}