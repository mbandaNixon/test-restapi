// JSON-RPC

const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const app = express();
const { Users } = require("./users-rpc");

users = new Users();
const log = console.log;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.post("/rpc", validation, (req, res) => {
    users[req.body.method](req.body.params, function (err, result) {
        if (err) throw Error(err);
        res.json({jsonrpc: '2.0', result: result, id:req.body.id });
    });
    log('method:', req.body.method,' params:', req.body.params, 'id:', req.body.id);
});

app.all('*', (req, res) => {
    res.status(400).send(JSON.stringify({
        jsonrpc: '2.0',
        error: {code: -32601, message:'Bad request!'}
    }));
});

app.use((err, req, res, next) => {   
    log(err);
    res.status(400).send(JSON.stringify({
        jsonrpc: '2.0',
        error: err.error,
        id: err.id
    }));
});

app.listen(PORT, () => console.log('Start HTTP on port %d', PORT));


function validation(req, res, next) {
    if (!users[req.body.method]) {
        throw {
            error: {
                code: -32601,
                message:`Not found method:${req.body.method}`,
            },
            name:'Method not found', 
            id:req.body.id 
        };
    }
    next();
}
