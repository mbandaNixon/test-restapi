// JSON-REST
/*
• Создать Web-Server на express ;
• Реализовать CRUD для сущности /users ;
• Определить свойство name и score ;
• Использовать REST;
• Реализовать обработку ошибок.
--------------------------------
 /users
   GET    найти всех пользователей
   POST   создать нового, в body: name=...&score=...
 /users/:id
   GET    найти пользователя по id
   PUT    обновить данные пользователя по id (в теле score=...)
   DELETE удалить пользователя по id
--------------------------------
 curl -X GET "http://localhost:3000/users"
 curl -X GET "http://localhost:3000/users/1"
 curl -X POST --data "name=Mark&score=100" "http://localhost:3000/users"
 curl -X PUT -d score=1111  localhost:3000/users/2
 curl -X DELETE localhost:3000/users/2
*/
 
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const app = express();
const { UserList } = require("./users-rest");

let log = console.log;
ul = new UserList();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.get("/", function (req, res){   
    res.send("Hello Test");
});
app.get("/ping", function (req, res){   
    res.json("pong");
});

app.get('/users', (req, res) => {
    res.json(ul);
    log('#Список:', ul.json());    
});

app.get('/users/:id', (req, res) => {
    const p = ul.get(req.params.id);
    if (p) {
        res.send(p);
    } else {
        res.json({error: userNoExist(req.params.id)});       
    }
    log('#Запрос:', result(req.params.id, p));
});

app.put('/users/:id', (req, res) => {
    const p = ul.update(req.params.id, {name:req.body.name, score:req.body.score});
    if (p) {
        res.json({done: true});
    } else {
        res.json({error: userNoExist(req.params.id)});
    }
    log('#Изменение:', result(req.params.id, p));
});

app.delete('/users/:id', (req, res) => {
    const p = ul.del(req.params.id);
    if (p) {
        res.json({done: true, message: `Удалён пользователь c id:${req.params.id}`});
    } else {
        res.json({error: userNoExist(req.params.id)});
    }
    log('#Удаление:', result(req.params.id, p));
});

app.post('/users', (req, res) => {
    const user = ul.add(name=req.body.name, score=req.body.score);
    res.json(user);
    log('#Добавление:', user.json());
});

app.all('*', (req, res) => {
    res.status(400).send('Некорректный запрос!');
});

app.use((err, req, res, next) => {   
    log(err);
    res.json(err);
});

app.listen(PORT, () => log('Start HTTP on port %d', PORT));

function userNoExist(id) {
    return `Пользователя с id:${id} не существует`;
}

function result(id, p) {
    return `id:${id}, ` + ((p) ? 'Успешно' : 'Нет такого пользователя');
}

// для тестов нежелательно чтобы этот модуль выводил в консоль
function setLogging(outModuleLogToConsole=true) {
    if (outModuleLogToConsole) {
        log = console.log;
    } else {
        log = function() {};
    }
}

module.exports.app = app;
module.exports.setLogging = setLogging;

