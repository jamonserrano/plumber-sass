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
		name = fontNameInput.value;
		weight = !fontWeightInput.value ? '400' : fontWeightInput.value;
		style = fontStyleInput.checked ? fontStyleInput.value : '';
		return `${name}:${weight}${style}`;
	}

	// Set sample font
	function onFontLoaded (e) {
		console.log('font loaded', e);
		Object.assign(letter.style, {
			'font-family': name,
			'font-weight': weight,
			'font-style': style ? 'italic' : 'normal'
		});
	}

	// Handle font error
	function onFontError (e) {
		console.log('font error', e);
	}
	// TODO don't submit form when unchanged
	// TODO don't allow more than 10 requests / minute 

	const form = document.forms[0];
	const fontNameInput = document.querySelector('.font-name');
	const fontWeightInput = document.querySelector('.font-weight');
	const fontStyleInput = document.querySelector('.font-style');
	const letter = document.querySelector('.letter');

	let name, weight, style;

	form.addEventListener('submit', onSubmit);
}