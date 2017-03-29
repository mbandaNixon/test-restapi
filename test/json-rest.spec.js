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

    it('Создание пользователя', done => {
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

    it('Удаление пользователя 1', done => {
        let userId = 1;
        request
            .delete('/users/' + userId)
            .expect(200)
            .end((err, response) => {
                expect(response.body.done).to.true;
                done();
            });
    });
});