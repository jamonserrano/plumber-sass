(function () {	
	// Send font request to Google Fonts
	function onSubmit (e) {
		e.preventDefault();
		var fontRequest = {
			families: [getFontString()]
		};
		// Safari doesn't show partial fonts'
		if (!window.safari) {
			fontRequest.text = 'A';
		}
		
		WebFont.load({
    		google: fontRequest,
			active: onFontLoaded,
			inactive: onFontError
  		});
	}

	// Get font details from the form
	function getFontString () {
		fontName = fontNameInput.value;
		fontWeight = !fontWeightInput.value ? '400' : fontWeightInput.value;
		fontStyle = fontStyleInput.checked ? 'i' : '';
		return `${fontName}:${fontWeight}${fontStyle}`;
	}

	// Set sample font
	function onFontLoaded (e) {
		/*Object.assign(letter.style, {
			'font-family': fontName,
			'font-weight': fontWeight,
			'font-style': fontStyle ? 'italic' : 'normal'
		});*/
		var style = letter.style;
		style.fontFamily = fontName;
		style.fontWeight = fontWeight;
		style.fontStyle = fontStyle ? 'italic' : 'normal';
		bodyClass.remove("show-intro", "show-error");
	}

	// Handle font error
	function onFontError (e) {
		var fontStyleString = fontStyle ? 'Italic' : '';
		error.textContent = `Could not load font ‘${fontName} ${fontWeight} ${fontStyleString}’. Are you sure you got it right?`
		bodyClass.remove("show-intro");
		bodyClass.add("show-error");
	}

	// Handle dragging and dropping
	function onDragMove (e, pointer) {
		var rulerPosition = ruler.offsetTop;
		var position = (rulerTop - rulerPosition) / 1000;
		rulerBox.textContent = position.toFixed(3);
	}

	// form
	var form = document.forms[0];
	var fontNameInput = document.querySelector('.font-name');
	var fontWeightInput = document.querySelector('.font-weight');
	var fontStyleInput = document.querySelector('.font-style');
	var letter = document.querySelector('.letter');
	var fontName, fontWeight, fontStyle;
	form.addEventListener('submit', onSubmit);

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

	draggable.on('dragMove', onDragMove);
	draggable.on('dragEnd', onDragMove);

	fontNameInput.focus();
}());