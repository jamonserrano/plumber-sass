(function () {	
	// Send font request to Google Fonts
	function onSubmit (e) {
		e.preventDefault();
		WebFont.load({
    		google: {
      			families: [getFontString()],
				text: 'A'
    		},
			active: onFontLoaded,
			inactive: onFontError
  		});
	}

	// Get font details from the form
	function getFontString () {
		fontName = fontNameInput.value;
		fontWeight = !fontWeightInput.value ? '400' : fontWeightInput.value;
		fontStyle = fontStyleInput.checked ? fontStyleInput.value : '';
		return `${fontName}:${fontWeight}${fontStyle}`;
	}

	// Set sample font
	function onFontLoaded (e) {
		Object.assign(letter.style, {
			'font-family': fontName,
			'font-weight': fontWeight,
			'font-style': fontStyle ? 'italic' : 'normal'
		});
	}

	// Handle font error
	function onFontError (e) {
		console.log('font error', e);
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
	var draggable = new Draggabilly(ruler, {
		containment: measureArea,
		axis: 'y'
	});

	var rulerTop = Math.floor(ruler.offsetTop);

	draggable.on('dragMove', onDragMove);
	draggable.on('dragEnd', onDragMove);
}());