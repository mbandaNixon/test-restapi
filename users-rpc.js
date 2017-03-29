class User {
    constructor(name = '', score = 0, id = 0 ) {
        this.id = id;
        this.name = name;
        this.score = score;
    }
}

class Users extends Array {
    constructor () {
        super();
        this.id = 0;
    }

    // возвращает индекс объекта по id
    _indexById(id) {
        return this.findIndex( ob => ob.id == id);
    }

    // добавить
    add(options = {name: '', score: 0}, callback) {
        this.id += 1;
        const user = new User(options.name, options.score, this.id)
        this.push(user);
        callback(null, user);
    }

    // возвращает весь список
    getall(options = {}, callback) {
        callback(null, this);
    }

    // возвращает объект по id
    get(options = {}, callback) { 
        let index = this._indexById(options.id);
        if (index > -1) {
            return callback(null, this[index]);
        }
        callback(null, {}); 
    }

    // удалить элемент из списка по id
    del(options = {}, callback) {
        let index = this._indexById(options.id);
        if (index > -1) {
            let deletedItem = this[index];
            this.splice(index, 1);
            return callback(null, deletedItem);
        }
        callback(null, {});
    }
    
    // редактирование объекта по id
    update(options = {}, callback) {
        let index = this._indexById(options.id);
        if (index > -1) {
            if (options.name) this[index].name = options.name;
            if (options.score) this[index].score = options.score;
            return callback (null, this[index]);
        }
        callback(null, {});       
    }
}

module.exports = {
    Users
}
