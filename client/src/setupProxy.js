const proxy = require('http-proxy-middleware');

module.exports = function(app){
    app.use(proxy('/imageupload',
        {"target": "http://localhost:4000"}
    ));
    app.use(proxy('/check',
        {"target": "http://localhost:4000"}
    ));
    app.use(proxy('/files',
        {"target": "http://localhost:4000"}
    ));
    app.use(proxy('/image',
        {"target": "http://localhost:4000"}
    ));
}
