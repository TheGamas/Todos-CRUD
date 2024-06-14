export default class Model{

    constructor(){
        this.todos = JSON.parse(localStorage.getItem('todos'));
        if (!this.todos || this.todos.length === 0){
            this.todos = []
            this.createTodo(0, "Learn HTML", "Watch HTML Tutorials", false)
        }
    }


    createTodo(id, title, description, completed){
        this.todos.push({id, title, description, completed})
        this.save();
    }

    isEmpty(){
        return this.todos.length === 1;
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

    changeCompletedTodo(id){
        this.todos.map((todo) => {
            if(todo.id === id){
                todo.completed = ! todo.completed;
            }
        })
        this.save()
    }

}