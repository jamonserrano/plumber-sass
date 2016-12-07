{	
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

		ruler.style.top = rulerTop + 'px';
		rulerBox.style.top = rulerTop + 'px';
		rulerBox.textContent = '0.000';
	}

	// Handle font error
	function onFontError (e) {
		console.log('font error', e);
	}

	function onDragMove (e, pointer) {
		const rulerPosition = ruler.offsetTop;
		const rulerPositionPx = rulerPosition + 'px';
		rulerBox.style.top = rulerPositionPx;
		const position = (rulerTop - rulerPosition) / 1000;
		rulerBox.textContent = position.toFixed(3);
	}

	// form
	const form = document.forms[0];
	const fontNameInput = document.querySelector('.font-name');
	const fontWeightInput = document.querySelector('.font-weight');
	const fontStyleInput = document.querySelector('.font-style');
	const letter = document.querySelector('.letter');
	let fontName, fontWeight, fontStyle;
	form.addEventListener('submit', onSubmit);

	// ruler
	const ruler = document.querySelector('.ruler');
	const rulerBox = document.querySelector('.ruler-box');
	const rulerName = document.querySelector('.ruler-name');
	const measureArea = document.querySelector('.measure-area');
	const draggable = new Draggabilly(ruler, {
		containment: measureArea,
		axis: 'y'
	});

	let rulerHeight = Math.floor(ruler.offsetHeight / 2);
	let rulerTop = Math.floor(ruler.offsetTop);

	draggable.on('dragMove', onDragMove);
	draggable.on('dragEnd', onDragMove);
}