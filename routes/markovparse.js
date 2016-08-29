var express = require('express');
var router = express.Router();
var markov = require('markovchain')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var quote = require('quotefind')
loadAuthors("ARISTOTLE")
loadAuthors("DICKENS")
loadAuthors("DOYLE")
loadAuthors("EMERSON")
loadAuthors("TWAIN")
loadAuthors("JEFFERSON")
loadAuthors("POE")
loadAuthors("PLATO")
var punc = "?!."
var authorEnum = {
}
router.get('/', function(req, res, next) {
	res.render("index");
});
router.get('/sentences/:id', function(req, res) {
	var authorName = req.params.id.toUpperCase()
	var markovSentence = {
		text: getMarkovSentence(authorName),
		quote: false
	}
	var quoteSentence = {
		text: quote.getSentenceFromText(authorEnum[authorName]),
		quote: true
	}
	var switchChance = Math.random()
	if (switchChance > 0.5) {
		res.send({sentences: [markovSentence, quoteSentence]})
	} else {
		res.send({sentences: [quoteSentence, markovSentence]})
	}
})

function useUpperCase(wordList) {
	var tmpList = Object.keys(wordList).filter(function(word) {
		return word[0] >= 'A' && word[0] <= 'Z'
	})
	return tmpList[~~(Math.random() * tmpList.length)]
}
function endWithPunc(sentence) {
	console.log(sentence.substring(sentence.length - 1, sentence.length))
	if (punc.includes(sentence.substring(sentence.length - 1, sentence.length))) {
		console.log(sentence)
	}
	return punc.includes(sentence.substring(sentence.length - 1, sentence.length))
}

function loadAuthors(name) { 
	fs.readFile(__dirname + "/" + name + '.txt', "utf-8", function(err, data) {
		if (err) {
			console.log(err)
		}
		authorEnum[name] = data
	});
}
function getMarkovSentence(authorName) {
	if (!authorEnum[authorName]) {
		return "Couldn't find author."
	} else {
		var mChain = new markov(authorEnum[authorName])
		quote.setText(authorEnum[authorName])
		console.log(quote.getSentence())
		var returnString = mChain.start(useUpperCase).end(15 + ~~(Math.random()*5) ).process()
		if (!".!".includes(returnString.substring(returnString.length - 1, returnString.length))) {
			var altpunc = "-;,"
			if (altpunc.includes(returnString.substring(returnString.length - 1, returnString.length))) {
				returnString = returnString.substring(0, returnString.length - 1) + "."
			} else {
				returnString += "."
			}
		}
		returnString = returnString.replace("(", "")
		returnString = returnString.replace(")", "")
		returnString = returnString.replace("\"", "")
	}
	return returnString
}
// func is redundant but eh
module.exports = router;