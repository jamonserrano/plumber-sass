(function () {	
	// Send font request to Google Fonts
	function onSubmit (e) {
		e.preventDefault();
		parseForm();
		
		var source = fontSourceInput.value;
		if (source === "local") {
			loadLocalFont();
		} else if (source === "google") {
			loadGoogleFont()
		}
	}

	// Load a local font
	function loadLocalFont () {
		showLoading();
		setNewFont();
		setTimeout(checkFontLoaded, 500);
	}

	// Load a font from Google Fonts
	function loadGoogleFont () {
		var fontRequest = {
			families: [getFontString()]
		};
		// Safari doesn't show partial fonts'
		if (!window.safari) {
			fontRequest.text = 'A';
		}
		
		WebFont.load({
    		google: fontRequest,
			loading: showLoading,
			active: onGoogleFontLoaded,
			inactive: showError
  		});

	}

	// Get font name, weight, and style
	function parseForm () {
		fontName = fontNameInput.value;
		fontWeight = !fontWeightInput.value ? '400' : fontWeightInput.value;
		fontStyle = fontStyleInput.checked ? 'i' : '';
	}

	// Get font details from the form
	function getFontString () {
		return `${fontName}:${fontWeight}${fontStyle}`;
	}

	// Show loading screen
	function showLoading () {
		bodyClass.remove("show-intro", "show-error");
		bodyClass.add("show-loading");
	}

	// Set and show google font
	function onGoogleFontLoaded () {
		setNewFont();
		showFont();
	}

	// Set new font
	function setNewFont () {
		var style = letter.style;
		style.fontFamily = '"' + fontName + '", "AdobeBlank"';
		style.fontWeight = fontWeight;
		style.fontStyle = fontStyle ? 'italic' : 'normal';
	}

	// Check if the local font has been loaded
	function checkFontLoaded () {
		if (letter.getBoundingClientRect().width > 0) {
			showFont();
		} else {
			showError();
		}
	}

	// Show the new font
	function showFont () {
		bodyClass.remove("show-intro", "show-loading", "show-error");
	}

	// Handle font error
	function showError (e) {
		var fontStyleString = fontStyle ? ' Italic' : '';
		error.textContent = `Could not load font ‘${fontName} ${fontWeight}${fontStyleString}’. Are you sure you got it right?`
		bodyClass.remove("show-intro", "show-loading");
		bodyClass.add("show-error");
	}

	// Handle dragging and dropping
	function onDragMove (e, pointer) {
		var rulerPosition = ruler.offsetTop;
		var position = (rulerTop - rulerPosition) / 1000;
		rulerBox.textContent = position.toFixed(3);
	}

	// placeholders
	var fontName, fontWeight, fontStyle;

	// form
	var form = document.forms[0];
	var fontNameInput = document.querySelector('.font-name');
	var fontWeightInput = document.querySelector('.font-weight');
	var fontStyleInput = document.querySelector('.font-style');
	var fontSourceInput = document.querySelector('.font-source');
	var letter = document.querySelector('.letter');

	// ruler
	var ruler = document.querySelector('.ruler');
	var rulerBox = document.querySelector('.ruler-box');
	var rulerName = document.querySelector('.ruler-name');
	var measureArea = document.querySelector('.measure-area');
	var rulerTop = Math.floor(ruler.offsetTop);
	var draggable = new Draggabilly(ruler, {
		containment: measureArea,
		axis: 'y'
	});

	// miscellaneous
	var bodyClass = document.body.classList;
	var error = document.querySelector('.error > p');
	// Fix Firefox rendering  
	if (navigator.userAgent.indexOf('Firefox') > -1) {
		rulerTop =  rulerTop + 1;
	};

	form.addEventListener('submit', onSubmit);

	draggable.on('dragMove', onDragMove);
	draggable.on('dragEnd', onDragMove);
}());