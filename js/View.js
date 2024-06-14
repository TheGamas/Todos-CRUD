import Filters from "./components/Filters.js";

export default class View{
    constructor(model){
        this.table = document.getElementById('table');
        this.model = model;
        this.filters = new Filters()
        this.loadView();

        this.filters.onClick((filters) => this.filter(filters));

    }

    loadView(){
        this.model.getTodos().forEach(element => {
            this.createTodo(element.id, element.title, element.description, element.completed)
        });
    }
    
    showAlert(show){
        if (show){
            document.getElementById('alert').style.display = 'flex';
            return;
        }
        document.getElementById('alert').style.display = 'none';
    }

    createTodo(id, title, description, completed){
        this.table.insertAdjacentHTML('beforeend', this.createRow(id, title, description, completed));
        this.createModal(id);
        this.asignButtons(id);
        
    }

    asignButtons(id){
        document.getElementById(`update1-${id}`).addEventListener('click', () => this.updateTodo(id));
        document.getElementById(`delete-${id}`).addEventListener('click', () => this.removeTodo(id));
        
        document.getElementById(`button-modal-${id}`).addEventListener('click', () => {
            
            if (this.formsUpdateEmpty(id)){
                document.getElementById(`modal-${id}`).style.display = 'none';
                this.showAlert(true);
                return;
            }
            this.showAlert(false);

            let title = document.getElementById(`modal-title-${id}`).value;
            let description = document.getElementById(`modal-description-${id}`).value;
            this.updateRow(id, title, description);
            document.getElementById(`modal-${id}`).style.display = 'none';
            this.model.updateTodo(id, title, description)
        })

        document.getElementById(`completed-${id}`).addEventListener('click', () => {
            this.model.changeCompletedTodo(id)
        });

    }

    formsUpdateEmpty(id){
        let titulo = document.getElementById(`modal-title-${id}`);
        let desc = document.getElementById(`modal-description-${id}`);
        return titulo.value === '' || desc.value === '';
    }


    removeTodo(id){
        document.getElementById(`row-${id}`).remove();
        this.model.removeTodo(id);
    }

    updateTodo(id){
        document.getElementById(`modal-${id}`).style.display = 'flex';
    }


    
    createRow(id, title, description, completed){
        return `<tr id="row-${id}">
                    <td id="title-${id}">${title}</td>
                    <td id="description-${id}">${description}</td>
                    <td>
                        ${this.createCompleted(id, completed)}
                    </td>
                    <td class="td-buttons">
                        <button class="update-button" id="update1-${id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-button" id="delete-${id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>`
    }

    createCompleted(id, completed){
        if (completed){
            return `<input type="checkbox" id="completed-${id}" checked></input>`;
        }
        return `<input type="checkbox" id="completed-${id}"></input>`;   
    }


    createModal(id){
        document.body.insertAdjacentHTML('afterbegin', 
            `<div class="update-modal" id="modal-${id}">
                <div class="form">
                    <div>
                        <label>Title</label>
                        <input type="text" name="title" id="modal-title-${id}">
                    </div>
                    <div>
                        <label>Description</label>
                        <input type="text" name="description"id="modal-description-${id}">
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

    filter(filters){
        const {type, words} = filters;
        let rows = this.table.getElementsByTagName('tr')
        for (const row of rows){
            const [title, descripcion, completed] = row.children; 
            const isCompleted = completed.children[0].checked;

            let showDueToName = (title.innerText.includes(words) || descripcion.innerText.includes(words));
            let shoudBeCompleted = type === 'Completed';
            let showDueToCompleted = type === 'All' || completed.children[0].checked === shoudBeCompleted;
            

            if (showDueToName && showDueToCompleted){
                row.style.display = 'table-row'
            }
            else{
                row.style.display = 'none'
            }
        }
    } 
}