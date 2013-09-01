var cdcommon = {compact: true,
		layout: "{mn}{sep}{snn} minutes left",
		until: +5}
var hltime = 1 * 1000;

$(document).ready(function() {
    var entryfield = $('#entryfield');
    var startbtn = $('#startbtn');
    var sentencefs = $('#sentence-fs');
    var sentencens = $('#sentence-ns');
    var sentencels = $('#sentence-ls');
    var sentencefinish = $('#sentence-finish');
    var counts = $("#counts")

    /* From http://stackoverflow.com/questions/14010446/word-and-character-count-using-jquery */
    var countText = function(element) {
	var txtVal = element.val();
	var words = txtVal.trim().replace(/\s+/gi, ' ').split(' ').length;
	var chars = txtVal.length;
	if(chars===0){words=0;}
	return {'chars': chars, 'words': words};
    };

    var NoSeqShow = function() {
	$("#countdownfs").hide();

	sentencens.addClass('highlighted');
	setTimeout(function(){ sentencens.removeClass('highlighted');}, hltime);
	sentencens.fadeIn();

	var nscountdown = cdcommon;
	nscountdown.onExpiry = LastStrawShow;
	$('#countdownns').countdown(nscountdown);
    };

    var LastStrawShow = function() {
	$("#countdownns").hide();

	sentencels.addClass('highlighted');
	setTimeout(function(){ sentencels.removeClass('highlighted');}, hltime);
	sentencels.fadeIn();

	var lscountdown = cdcommon;
	lscountdown.onExpiry = FinishShow;
	$('#countdownls').countdown(lscountdown);
    };

    var FinishShow = function() {
	$("#countdownls").hide();

	sentencefinish.addClass('highlighted');
	setTimeout(function(){ sentencefinish.removeClass('highlighted');}, hltime);
	sentencefinish.fadeIn();
    };

    $('textarea').on('keyup propertychange paste', function(){ 
	c = countText(entryfield);
	counts.text("You have written " + c.words + " words and " + c.chars + " characters.");
    });

    startbtn.click( function() {
	startbtn.hide()

	sentencefs.addClass('highlighted');
	sentencefs.fadeIn();
	setTimeout(function(){ sentencefs.removeClass('highlighted');}, hltime);

	var fscountdown = cdcommon;
	fscountdown.onExpiry = NoSeqShow;
	$('#countdownfs').countdown(fscountdown);

	entryfield.fadeIn();
	entryfield.focus();
    });
});
