var express = require('express')
var app = express()
var Nedb = require('nedb')
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(express.static('../client'))


var database = new Nedb({ filename: './data/data.db', autoload: true })

app.get('/getSaved', function (req, res) {
	var query = {}

	var done = function (err, data) {
		console.log('I just read stuff from the database')
		res.send(data)
	}

	database.find(query, done)
})

app.post('/saveCurrent', function (req, res) {
	var data = { word: req.body.word, date: Date.now() }

	var done = function () {
		console.log('I just wrote to the database')
		res.end("done")
	}

	database.insert(data, done)
})

app.listen(8080)