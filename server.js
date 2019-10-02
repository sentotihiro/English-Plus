//EJS, node, mysql,を使ったシングルページアプリ

var http = require('http');
     fs = require('fs');
     ejs = require('ejs');
     qs = require('querystring');
var settings = require('./setting');//設定を外部ファイルに
console.log(settings);
var server = http.createServer();
var template = fs.readFileSync(__dirname + '/index.ejs', 'utf-8');
var posts = [];

function renderForm(posts, res) {
    var data = ejs.render(template, {
        posts: posts
    });
    res.writeHead(200, {'Content-type': 'text/html'});
    res.write(data);
    res.end();
}

server.on('request', function(req,res){
    if (req.method === 'POST') {
        req.data = "";
        req.on("data", function(chunk){
            req.data += chunk;
        });
        req.on("end", function(){
            var query = qs.parse(req.data);
            posts.push(query.namae);
            renderForm(posts, res);
        });
    } else {
        renderForm(posts, res);
    }
});

server.listen(settings.port, settings.host);
console.log("サーバーがリクエストされました");