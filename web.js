var express = require('express')
  , util = require('util')
  , ejs = require('ejs')
  , engine = require('ejs-locals')
  , mongoose = require('mongoose')
  , us = require('underscore')
  ;

var app = express();

app.engine('ejs', engine);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.locals({
  _layoutFile: true
});

app.use(express.logger());
app.use(express.static('public'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: process.env.SESSION_SECRET || 'kdgfcbdgfsgftsrcgsgr'}));
app.use(express.errorHandler());

// Ensure HTTPS: http://elias.kg/post/14971446990/force-ssl-with-express-js-on-heroku-nginx
app.use(function(req, res, next) {
    var schema = req.headers["x-forwarded-proto"];

    if (!schema || schema === "https") {
        return next();
    }
    // --- Redirect to https
    res.redirect("https://" + req.headers.host + req.url);
});

var firstsentences = new Array("Dad gave me a wink, like we were pals or something.",
			       "I put tulips under all the pillows, and then I set fire to the house.",
			       "The only way John could pass the exam was by cheating."
			      );
var nonsequiturs = new Array("She was standing behind the counter, giving him this root beer-float kind of smile.",
			     "\"There you go, making up lies again.\" That's what they told me.",
			     "The plane was two hours late."
			    );

var laststraws = new Array("the thing he does with the newspaper",
			   "the hole in his sock",
			   "the date I loaned Morgan 400 bucks"
			  );


var fsnum = firstsentences.length - 1;
var nsnum = nonsequiturs.length - 1;
var lsnum = laststraws.length - 1;

var getSentence = function(fstype) {
    if (fstype == 'fs') {
	sentence = firstsentences[us.random(fsnum)];
    } else if (fstype == 'ns') {
	sentence = nonsequiturs[us.random(nsnum)];	
    } else if (fstype == 'ls') {
	sentence = laststraws[us.random(lsnum)];
    } else {
	sentence = '';
    }
    return sentence;
}

/* Routing  */
app.get("/", function(req, res) {
    res.render('front.ejs',
	       { req: req,
		 firstsentence: getSentence('fs'),
		 nonsequitur: getSentence('ns'),
		 laststraw: getSentence('ls')
	       });
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Listening on " + port);
});
