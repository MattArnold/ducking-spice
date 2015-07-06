var http       = require('http');
var url        = require('url') ;
var request    = require('request');
var express    = require('express');
var bodyParser = require("body-parser");

var loginform = '<form id="login" action="login" method="post">Username: <input type="text" name="username" id="username" /> <input type="submit" value="Submit" /></form>';
var logoutform = '<form id="logout" action="logout" method="post"><input type="submit" value="Logout"></form>';
var loggedin = false;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', function(req, res){
	loggedin = true;
	res.send(logoutform + '<br><br>Logged in as ' + req.body.username);
});

app.post('/logout', function(req, res, next){
	loggedin = false;
	res.redirect('/');
});

app.get('/', function(req, res) {
	var urlQuery = url.parse(req.url, true).query.q;
	var endPoint = 'http://api.giphy.com/v1/gifs/translate?s=(' + urlQuery + ')&api_key=dc6zaTOxFJmzC';
	var gif;

	request(endPoint, function(err, resp, body) {
		var form = loggedin ? logoutform : loginform;
		body = JSON.parse(body);
		var gif = loggedin ? '<img src="' + body.data.images.fixed_height.url + '">' : '<div>Unauthorized. Please log in.</div>';
		res.send(form + '<br><br>' + gif);
	});

});

app.listen(8080);
console.log('Listening on port 8080.');
