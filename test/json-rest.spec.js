const supertest = require("supertest");
const expect = require('chai').expect;
const app = require("../json-rest").app;
require("../json-rest").setLogging(false);

describe('REST API', () => {
    let request;

    before((done) => {
        setTimeout(() => {
            request = supertest(app);
            done();
        }, 1000);
    });

    describe('Создание пользователя', () => {
        it('заданы все данные: name и score', done => {
            const user = {name:'qwerty', score:100};
            request
                .post('/users')
                .send(user)
                .expect(200)
                .end((err, response) => {
                    expect(response.body).to.contains(user);
                    //expect(response.body.name).to.equal(user.name);
                    //expect(response.body.score).to.equal(user.score);
                    done(); 
                });
        });

        it('если score не задан, то создаст пользователя со score=0', done => {
            const user = {name:'Павел'};
            request
                .post('/users')
                .send(user)
                .expect(200)
                .end((err, response) => {
                    expect(response.body.score).to.equal(0);
                    done(); 
                });
        });

        it('если name не задано, то создаст пользователя с пустым именем', done => {
            const user = {score: 123};
            request
                .post('/users')
                .send(user)
                .expect(200)
                .end((err, response) => {
                    expect(response.body.name).to.equal('');
                    done(); 
                });
        });

        it('если ничего не задано, то создаст пользователя с пустым именем и score=0', done => {
            const user = {};
            request
                .post('/users')
                .send(user)
                .expect(200)
                .end((err, response) => {
                    expect(response.body.name).to.equal('');
                    expect(response.body.score).to.equal(0);
                    done(); 
                });
        });

    });

    describe('Удаление пользователя', () => {
        it('удаление пользователя с id=1', done => {
            let userId = 1;
            request
                .delete('/users/' + userId)
                .expect(200)
                .end((err, response) => {
                    expect(response.body.done).to.true;
                    done();
                });

        });

        it('ошибка удаление пользователя с несуществующим id=1000000', done => {
            let userId = 1000000;
            request
                .delete('/users/' + userId)
                .expect(200)
                .end((err, response) => {
                    expect(response.body.error).to.exist;
                    done();
                });

        });

        it('получение ошибки 400 если в строке запроса не указан userId', done => {
            request
                .delete('/users/')
                .expect(400)
                .end(done);
        });

        it('получение ошибки 400 если в строке запроса ничего не задано', done => {
            request
                .delete('')
                .expect(400)
                .end(done);
        });

    });



});