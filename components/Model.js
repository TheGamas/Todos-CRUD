export default class Model{

    constructor(){
        this.todos = JSON.parse(localStorage.getItem('todos'));
        if (!this.todos){
            this.todos = []
        }
    }


    createTodo(id, title, description){
        this.todos.push({id, title, description})
        this.save();
    }

    getTodos(){
        return this.todos;
    }

    save(){
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    removeTodo(id){
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.save();
    }

    updateTodo(id, title, description){
        const index = this.todos.findIndex(todo => todo.id === id);
        if(index !== -1){
            this.todos[index].title = title;
            this.todos[index].description = description;
            this.save();
        }
    }

}