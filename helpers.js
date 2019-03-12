const sass = require('node-sass');
const { promisify } = require('util');
const renderSass = promisify(sass.render);

global.render = (data) => 
	renderSass({ data, outputStyle: 'expanded', precision: 6 })
		.then(({ css }) => css.toString('utf8'))
		.catch(({ message }) => message);
