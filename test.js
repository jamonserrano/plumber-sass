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

const render = (params) =>
	renderSass({
		data: `${prefix}${params}${postfix}`,
		outputStyle: 'expanded',
		precision: 6
	})
	.then(({ css }) => css.toString('utf8'))
	.catch(({ message }) => message);

describe('plumber-sass', () => {
	it('should render scss', async () => {
		const params = `
			$grid-height: 1rem,
			$baseline: 0.158203,
			$font-size: 1.75,
			$line-height: 3,
			$margin-top: 1,
			$margin-bottom: 2
		`;

		const result = await render(params);
		expect(result).toMatchSnapshot();
	});
	it('should throw an error', async () => {
		const params = `
			$grid-height: 1rem,
			$baseline: 0.158203,
			$font-size: 1.75,
			$line-height: -3,
			$margin-top: 1,
			$margin-bottom: 2
		`;

		const result = await render(params);
		expect(result).toMatchSnapshot();
	});
});