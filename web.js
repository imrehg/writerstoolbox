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
			       "The only way John could pass the exam was by cheating.",
			       "There were 17 cats living in Larry's basement.",
			       "On Tuesday, Margaret told me she liked the little oranges with the seeds better than the ones I boght. I hated her for that.",
			       "I was dressed in a completely inappropriate shade of pink.",
			       "I loved the way she said \"balloon.\" She said it as if she were blowing bubbles.",
			       "He swore on his mother's grave, but then he swore on just about everything",
			       "My brother did this weird thing with turtles.",
			       "Michael sat down in the middle of the road and began to cry.",
			       "My grandfather lied to my grandmother. I guess it runs in the family.",
			       "I had this system for getting exactly what I wanted out of people.",
			       "Your mother lied to you. That's the truth.",
			       "\"I like hats.\" That's wha Donald said the day before he killed Sally.",
			       "After only two months, Helen decided to become an exotic dancer.",
			       "My mother was doing that thing she did. That thing with the rag in the sink.",
			       "My only defense ws to write down every word they said.",
			       "There I was, just standing there, when what I wanted to do was forbidden.",
			       "Charlotte ate green peppers all day long.",
			       "There she was, Amy Gernstein, over by the pool, kissing my father."
			      );

var nonsequiturs = new Array("She was standing behind the counter, giving him this root beer-float kind of smile.",
			     "\"There you go, making up lies again.\" That's what they told me.",
			     "The plane was two hours late.",
			     "They were all the same, I decided.",
			     "Margaret had this habit of spitting. It began getting on my nerves.",
			     "It wasn't so much that I had been blind to the truth. It was just that I had seen the truth differently.",
			     "Tom lost 25 bucks at the races.",
			     "On the following Friday, we packed our bags and planned our escape.",
			     "Eloise was my half-sister, but everyone thought she was my cousin.",
			     "She may be young, but she's not stupid.",
			     "\"If you don't take chances,\" said the man in striped pijamas, \"you might as well not be alive.\"",
			     "\"You could make a living doing that kind of thing.\" I suppose I could, but I had never thought about it, until then.",
			     "She started taking up a lot of bad habits.",
			     "I cheated on my spouse. And it wasn't the first time.",
			     "She found him in the Termnial Bar and Grill. He was sober, for a change.",
			     "She found a diamond bracelet in the back of her car.",
			     "On Tuesday, she asked me the most peculiar question.",
			     "I decided, the only solution was to seduce him.",
			     "He was skating on thin ice - that's all I can say.",
			     "We were drinking champagne and losing our shirts."
			    );

var laststraws = new Array("the thing he does with the newspaper",
			   "the hole in his sock",
			   "the date I loaned Morgan 400 bucks",
			   "the day Lilian learned to drive",
			   "that weekend in Duluth",
			   "the lemon sherbet that melted all over the counter",
			   "the way Herb defrosted the refigerator",
			   "the time he invited his mother to dinner",
			   "the stain on the wall",
			   "the day Sheila brought Hillary to my office",
			   "the way she made tea",
			   "the bill she forgot to pay",
			   "the last time they saw a movie",
			   "the time Leslie called me a leech",
			   "the way he writes with both his left and right hands",
			   "the thing she did to the breaks on the Honda",
			   "the tear in her dress",
			   "the day her moder slapped her face",
			   "the time he caught a fly ball",
			   "the time Fred went to the car wash and never came back"
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
