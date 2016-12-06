{	
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

	function getFontString () {
		name = fontNameInput.value;
		weight = !fontWeightInput.value ? '400' : fontWeightInput.value;
		style = fontStyleInput.checked ? fontStyleInput.value : '';
		return `${name}:${weight}${style}`;
	}

	function onFontLoaded (e) {
		console.log('font loaded', e);
		Object.assign(letter.style, {
			'font-family': name,
			'font-weight': weight,
			'font-style': style ? 'italic' : 'normal'
		});
	}

	function onFontError (e) {
		console.log('font error', e);
	}
	// TODO don't submit form when unchanged
	// TODO don't allow more than 10 requests / minute 

	WebFontConfig = {
		text: 'A'
	};

	const form = document.forms[0];
	const fontNameInput = document.querySelector('.font-name');
	const fontWeightInput = document.querySelector('.font-weight');
	const fontStyleInput = document.querySelector('.font-style');
	const letter = document.querySelector('.letter');

	let name, weight, style;

	form.addEventListener('submit', onSubmit);
}