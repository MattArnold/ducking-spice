var http = require('http');
var url = require('url') ;
var request = require('request');
var express = require('express');
var app = express();

app.get('/', function(req, res) {
	var urlQuery = url.parse(req.url, true).query.q;
	var endPoint = 'http://api.giphy.com/v1/gifs/translate?s=(' + urlQuery + ')&api_key=dc6zaTOxFJmzC';
	var gif;

	request(endPoint, function(err, resp, body) {
		body = JSON.parse(body);
		gif = '<img src="' + body.data.images.fixed_height.url + '">';
		res.send('Username: <input type="text"><br><br>' + gif);
	});

});

app.listen(8080);

console.log('Listening on port 8080.');
