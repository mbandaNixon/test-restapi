class User {
    constructor(name = '', score = 0, id = 0 ) {
        this.id = id;
        this.name = name;
        this.score = score;
    }

    show() {
        console.log(JSON.stringify(this));
    }

    json() {
        return(JSON.stringify(this));
    }

    valueOf() {
        return this.id;
    }
}

class UserList extends Array {
    constructor () {
        super();
        this.id = 0;
    }

    // добавить
    add(name = '', score = 0) {
        this.id += 1;
        const user = new User(name, score, this.id)
        this.push(user);
        return user;
    }

    // печатает весь список
    show() {
        console.log(`[ user in list: ${this.length} ]:`);
        this.forEach(ob => ob.show());
    }

    // возвращает весь список в формате json
    json() {
        return JSON.stringify(this);
    }

    // возвращает индекс объекта по id
    _indexById(id) {
        return this.findIndex( ob => ob.id == id);
    }

    // возвращает индекс объекта по name
    _indexByName(name) {
        return this.findIndex( ob => ob.name === name);
    }

    // возвращает объект по id
    // или null если не найден
    get(id) {
        let index = this._indexById(id);
        if (index > -1) {
            return this[index];
        }
        return null;
    }

    // удалить элемент из списка по id
    // возвращает удалённый элемент или null если элемент не найден
    del(id) {
        let index = this._indexById(id);
        if (index > -1) {
            let deletedItem = this[index];
            this.splice(index, 1);
            return deletedItem;
        }
        return null;
    }

    // редактирование объекта по id
    // возвращает результат редактирования или null если не найден
    update(id, data) {
        let index = this._indexById(id);
        if (index > -1) {
            if (data.name) this[index].name = data.name;
            if (data.score) this[index].score = data.score;
            return this[index];
        }
        return null;        
    }
}

module.exports = {
    UserList
}

if (!module.parent) {
    const log = console.log;
    const ob = new UserList();
    ob.add('fox', 10);
    ob.add('bear', 20);
    ob.add('wolf', 5);
    ob.show();
    
    log('Ищем элемент с id=2');
    let user = ob.get(2);
    log(user);
    
    log('Удаляем элемент с id=2');
    ob.del(2);
    ob.show();

    log('Обновляем элемент с id=1');
    ob.update(1, new User('abc', 100));
    ob.show();

    log('Весь список в формате json:')
    log(ob.json());

    ob['add']('qwerty', 12345);
    log(ob.json());
    
}
