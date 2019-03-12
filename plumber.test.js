describe('plumber-sass', () => {
	it('should render scss', async () => {
		const data = `
		@import 'plumber';
		p {
			@include plumber(
				$grid-height: 1rem,
				$baseline: 0.158203,
				$font-size: 1.75,
				$line-height: 3,
				$margin-top: 1,
				$margin-bottom: 2
			);
		}`;

		const result = await render(data);
		expect(result).toMatchSnapshot();
	});
	it('should throw an error', async () => {
		const data = `
		@import 'plumber';
		p {
			@include plumber(
				$grid-height: 1rem,
				$baseline: 0.158203,
				$font-size: 1.75,
				$line-height: -3,
				$margin-top: 1,
				$margin-bottom: 2
			);
		}`;

		const result = await render(data);
		expect(result).toMatchSnapshot();
	});
});