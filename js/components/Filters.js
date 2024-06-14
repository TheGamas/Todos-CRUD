export default class Filters{
    constructor(){
        this.type = this.getType();
        this.words = document.getElementById('words')
        this.searchBtn = document.getElementById('search')

        
    }

    onClick(callback){
        this.searchBtn.onclick = (e) => {
            e.preventDefault();
            this.type = this.getType();
            console.log(`${this.type.value} ${this.words.value}`);
            callback({type: this.type.value, words: this.words.value});
        }
    }
    getType(){
        const radioInputs = document.querySelectorAll('.filters input[type="radio"]');
        return Array.from(radioInputs).find(input => input.checked);
    }
}
