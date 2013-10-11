/**
 * @author Dexter Chen
 */
$(function() {
	/*定义各种变量, 并归零*/
	var sampleNumber = 0;
	var firstNumber = 0;
	var secondNumber = 0;
	var firstNumberSV = 0;
	var secondNumberSV = 5;
	var thirdNumberSV = 0;
	var settingToggle = 0;
	var $sampleNumber = $("#sampleNumber");
	var $sampleName = $("#sampleName");
	var $configuration = $("#configuration");
	var topLocation = 0;
	var leftLocation = 0;
	var topLocationSample = 0;
	var stageNumber = 1;
	var rowNumber = 0;
	var systemVolume = 50;
	var r = 0;

	/*把组件正确显示出来*/
	$(".hiddenInViewSource").hide();
	$("#masterMix").buttonset();
	$("#pcrTubeType").buttonset();
	$("#positiveControl").button();
	$("#negativeControl").button();
	$("#doneNGoToPrint").button();
	$("#addSamples").button();
	$("#setNumber").button();
	$("#doneNGoToPrint2").button();

	/*adjust Window Position*/

	initWindow();

	$(window).resize(function() {
		initWindow();
	});

	function initWindow() {
		topLocation = ($(window).height() - $sampleNumber.height()) / 2;
		leftLocation = ($(window).width() - $sampleNumber.width()) / 2;
		$sampleNumber.css("left", leftLocation);
		$sampleNumber.css("top", topLocation);
		$sampleName.css("left", leftLocation + 500);
		topLocationSample = ($(window).height() - 60 * rowNumber - 147) / 2;
		$sampleName.css("top", topLocationSample);
	}

	/*获得样本数量并显示出来*/

	$('#valueSlider').slider({
		min : 1,
		max : 96
	});

	$('#valueSlider').slider({
		change : function(e, ui) {
			sampleNumber = $("#valueSlider").slider("value");
			displayNumber();
			calculation();
		}
	});

	$("#plusNumber").on("click", function() {
		if (sampleNumber < 96) {
			sampleNumber += 1;
			displayNumber();
			calculation();
		} else {
			incorrectNumber();
		}

	});

	$("#subNumber").on("click", function() {
		if (sampleNumber > 1) {
			sampleNumber -= 1;
			displayNumber();
			calculation();
		} else {
			incorrectNumber();
		}

	});

	function incorrectNumber() {
		$("#dialog:ui-dialog").dialog("destroy");

		$("#incorrectNumber").dialog({
			height : 90,
			width : 350,
			modal : true,
			resizable : false
		});
	};

	function displayNumber() {

		rowNumber = Math.ceil(sampleNumber / 8);

		firstNumber = Math.floor(sampleNumber / 10);
		secondNumber = sampleNumber % 10;

		$("#firstNumber").css({
			"background-position" : firstNumber * -130 + "px"
		});
		$("#secondNumber").css({
			"background-position" : secondNumber * -130 + "px"
		});
	}

	/*获得反应容积并显示出来*/

	$("#systemVolume").slider({
		value : 50,
		min : 30,
		max : 100,
		step : 5,
		slide : function(event, ui) {
		}
	});

	displaysystemVolume();

	$("#systemVolume").slider({
		change : function(e, ui) {
			systemVolume = $("#systemVolume").slider("value");
			displaysystemVolume();
			calculation();
		}
	});

	function displaysystemVolume() {

		firstNumberSV = Math.floor(systemVolume / 100);
		secondNumberSV = Math.floor(systemVolume / 10);
		thirdNumberSV = systemVolume % 10;

		$("#firstNumberSV").css({
			"background-position" : firstNumberSV * -39 + "px"
		});
		$("#secondNumberSV").css({
			"background-position" : secondNumberSV * -39 + "px"
		});
		$("#thirdNumberSV").css({
			"background-position" : thirdNumberSV * -39 + "px"
		});
	}

	/*计算PCR系统中每个变量的值*/

	function calculation() {
		var positiveControl;
		if ($("#positiveControl").attr("checked")) {
			positiveControl = 1;
		} else {
			positiveControl = 0;
		}
		totalVolume = (sampleNumber + positiveControl) * systemVolume;
		console.log(totalVolume, positiveControl);
	}

	/* Animation of window*/
	$("#setting").on("click", function() {

		if (settingToggle == 0) {
			$sampleNumber.animate({
				top : "-=150"
			}, 500);
			$configuration.delay(550).slideDown(500);
			$configuration.delay(500).animate({
				opacity : 1
			}, {
				queue : false
			}, 500);
			settingToggle = 1;
		} else {
			$configuration.delay(50).slideUp({
				queue : false
			}, 500);
			$configuration.animate({
				opacity : 0
			}, {
				queue : false
			}, 500);
			$sampleNumber.delay(500).animate({
				top : "+=150"
			}, 500);
			settingToggle = 0;
		}
	});
	/* Animation of 3 stage*/

	$("#addSamples").on("click", function() {
		initWindow();
		if (sampleNumber == 0) {
			incorrectNumber();
		} else {
			generateTable();
			$sampleNumber.animate({
				opacity : 0,
				"left" : "-=500px",
			}, 500);

			$sampleName.delay(100).animate({
				opacity : 1,
				"left" : "-=500px",
			}, 500);
		}
	});

	$("#setNumber").on("click", function() {
		$sampleName.animate({
			opacity : 0,
			"left" : "+=500px",
		}, 500);

		$sampleNumber.delay(100).animate({
			opacity : 1,
			"left" : "+=500px",
		}, 500);
	});

	/* Generate table */
	function generateTable() {
		var rowNumberNow = $("#samplesRow").find("div.tubeStrip").length;
		for (var r = rowNumberNow; r <= rowNumber; r++) {
			$("#samplesRow").append('<div class="tubeStrip">
				<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>');
		}
		for (var r = rowNumberNow; r > rowNumber; r--) {
			$("#samplesRow div.tubeStrip:last-child").remove();
			console.log("deleted");
		}
	};

})/*this is the last bracket*/