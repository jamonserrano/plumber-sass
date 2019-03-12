const sass = require('node-sass');
const { promisify } = require('util');
const renderSass = promisify(sass.render);

const prefix = `
	@import 'plumber';
	p {
		@include plumber(
`;

const postfix = `
		)
	}
`;

global.render = (params) =>
	renderSass({
		data: `${prefix}${params}${postfix}`,
		outputStyle: 'expanded',
		precision: 6
	})
	.then(({ css }) => css.toString('utf8'))
	.catch(({ message }) => message);
