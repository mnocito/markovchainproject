var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var request = require('request')
var cheerio = require('cheerio')
var mongoose = require('mongoose')
require('./models/author.js')
mongoose.connect('mongodb://127.0.0.1/myapp')
var Author = mongoose.model('Author')
const etextUrl = "http://www.textfiles.com/etext/AUTHORS/"
// load all texts from authors.
loadBooks("ARISTOTLE", etextUrl);
loadBooks("BURROUGHS", etextUrl);
loadBooks("DICKENS", etextUrl);
loadBooks("DOYLE", etextUrl);
loadBooks("EMERSON", etextUrl);
loadBooks("HAWTHORNE", etextUrl);
loadBooks("IRVING", etextUrl);
loadBooks("JEFFERSON", etextUrl);
loadBooks("KANT", etextUrl);
loadBooks("KEATS", etextUrl);
loadBooks("MILTON", etextUrl);
loadBooks("PLATO", etextUrl);
loadBooks("POE", etextUrl);
loadBooks("SHAKESPEARE", etextUrl);
loadBooks("STEVENSON", etextUrl);
loadBooks("TWAIN", etextUrl);
loadBooks("WILDE", etextUrl);

function loadBooks(name, baseUrl) {
  name = name.toUpperCase()
  request(baseUrl + name, function(error, response, html) {
    $ = cheerio.load(html)
    var filenames = []
    var markovtext = ""
    $('td').filter(function() {
      var text = $(this).children().first().text()
      if (text != "" && text != "Size" && text != "Description" && text != "Text" && !text.includes("There are ")) {
        filenames.push($(this).children().first().text())
      }
      return $(this).attr('valign') == "TOP"
    })
    for (var i in filenames) {
      getText(baseUrl, name, filenames[i])
    }
  })
}

function useUpperCase(wordList) {
  var tmpList = Object.keys(wordList).filter(function(word) {
    return word[0] >= 'A' && word[0] <= 'Z'
  })
  return tmpList[~~(Math.random() * tmpList.length)]
}

function getText(baseUrl, name, element) {
  var url = baseUrl + name + "/" + element
  request(url, function(error, response, html) {
    if (error) {
      console.log(error)
    } else {
      Author.findOne({
        name: name
      }, function(err, author) {
        if (err) {
          console.log(err)
        } else if (author) {
          if (author.texts[element.replace(".", "")]) {
            return
          }
          var elementkey = element.replace(".", "")
          Author.findByIdAndUpdate(author._id, {
            $push: {
              texts: {
                [elementkey]: html
              }
            }
          }, function(err, obj) {
            if (err)
              console.log(err)
            console.log("success")
          })
        } else {
          var newAuthor = Author();
          newAuthor.name = name;
          newAuthor.texts[element.replace(".", "")] = html
          newAuthor.save(function(err) {
            if (err) {
              console.log(err)
            } else {
              console.log("works")
            }
          })
        }
      })
    }
  })
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;