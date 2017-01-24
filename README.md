# Plumber
https://jamonserrano.github.io/plumber-sass

Create better looking documents and speed up CSS development by adding vertical rhythm to your page.

> Looking for the postcss plugin? Go to https://github.com/jamonserrano/postcss-plumber.

## What is it?

Using a baseline grid on the web is not easy. For every font family and size you have to measure where the letters sit so you can shift the text to the nearest gridline. After this, you have to precariously add margins and paddings to keep the vertical rhythm.

Plumber provides a single SASS mixin that does all the hard work for you.

## Installation

### Manual
Download and extract [the latest release](https://api.github.com/repos/jamonserrano/plumber-sass/zipball), move `_plumber.scss` into the vendor folder of your project and include it:

```scss
@import "vendor/plumber";
```

### NPM / Yarn
Install:

```sh
# NPM
$ npm install plumber-sass --save-dev

#Yarn
$ yarn add plumber-sass --dev
```
And import it in your project:

```scss
@import "node_modules/plumber-sass/plumber";
```

### Bower
Install:

```sh
$ bower install plumber-sass --save-dev
```
And import it in your project:

```scss
@import "bower_components/plumber-sass/plumber";
```

## Usage
1\. Decide on the vertical grid height you will use in the unit of your choice (pixels or rems are recommended).

2\. Look up the baseline ratio of your font family [in the table](https://jamonserrano.github.io/plumber-sass/baselines/) or [use the measure tool](https://jamonserrano.github.io/plumber-sass/measure/). For example the value for Roboto is 0.158203.

3\. Include the plumber mixin in your styles – specify font size as a fraction, line height, top and bottom leadings as multiples of the grid height:

```scss
p {
	@include plumber(
		$grid-height: 1rem,
		$baseline: 0.158203,
		$font-size: 1.75,
		$line-height: 3,
		$leading-top: 1,
		$leading-bottom: 2
	);
	font-family: Roboto, sans-serif;
}
```

This will output the following CSS:

```css
p {
	font-size: 1.75rem;
	line-height: 3rem;
	margin-top: 0;
	padding-top: 0.81641rem;
	padding-bottom: 0.18359rem;
	margin-bottom: 2rem;
	font-family: Roboto, sans-serif;
}
```

> For a real-world example [take a look at the code](https://github.com/jamonserrano/plumber-sass/blob/gh-pages/scss/docs/_typography.scss) of the documentation page.

### Default settings
To avoid repetition set up default values before using the mixin:

```scss
@include plumber-set-defaults(
	$grid-height: 1rem,
	$baseline: 0.158203,
	$font-size: 1.75,
	$line-height: 3,
	$leading-top: 1,
	$leading-bottom: 2
);

p {
	// using only default values
	@include plumber();
}

li {
	// override leadings
	@include plumber(
		$leading-top: 0,
		$leading-bottom: 1
	);
}
```

### Using multiple fonts

When using multiple font families just add different `$baseline` parameters:

```scss
$body-font: Roboto, sans-serif;
$body-baseline: 0.158203;

$quote-font: Georgia, serif;
$quote-baseline: 0.151123;

p {
	@include plumber($baseline: $body-baseline);
	font-family: $body-font;
}

blockquote {
	@include plumber($baseline: $quote-baseline);
	font-family: $quote-font;
}
```

### Responsive typography
For responsive typography define the grid height in rems or other relative units, and metrics will change along.

```scss
@include plumber-set-defaults(
	$grid-height: 1rem,
	$font-size: 1.75
);

html {
	font-size: 8px;
	// grid height => 8px, font size => 14px
	
	@media screen and (min-width: 641px) {
		font-size: 12px;
		// grid-height => 12px, font size => 21px
	}
}
```

### Alternative leading calculation
Leadings are measured from the top and bottom edges of the text block by default. To measure them from the baseline, set `$use-baseline-origin: true` before using the mixin:

```scss
@include plumber-set-defaults($use-baseline-origin: true);
```

## Considerations

### Precision
Due to rounding and browser rendering it’s entirely possible that the text will not sit exactly on the baseline. Following these guidelines will get you closer to pixel perfection:

* Define grid height in pixels, or as a multiple of the base font height.
* Use a grid height with many divisors.
* Use font sizes that produce whole numbers with the grid height.

If you have access to the OpenType metrics of the font you can calculate a more precise baseline ratio with the following formula: `(UnitsPerEm − hhea.Ascender − hhea.Descender) / (2 × UnitsPerEm)`

### Varying baseline among fonts in the same family
Although some weights or styles in the same family can sit on different baselines, it’s generally fine to use the one for the regular font. If pixel perfection is important, set individual baselines for each font.

### Viewport-specific units
While supported, using vh, vw, vmin, vmax for the grid height can lead to catastrophic results.

### Collapsing margins
Plumber’s use of collapsing margins makes it possible to set the minimum distance between blocks of texts. If you don’t need this, you can set either `$leading-top` or `$leading-bottom` to 0.


## API

### plumber
The main mixin.

**Parameters:** All parameters are optional, default values can be changed with `plumber-set-defaults`.


Name | Description | Type | Default value
---- | ----------- | ---- | -------------
$baseline | Baseline ratio | Fraction between 0 and 1 | —*
$font-size | Font size as a fraction of grid height | Positive number | 2
$grid-height | Grid height | Any unit | 1rem
$leading-top | Top leading<sup>†</sup> as a multiple of grid height | Integer | 0<sup>‡</sup>
$leading-bottom | Bottom leading<sup>†</sup> as a multiple of grid height | Integer | 0<sup>‡</sup>
$line-height | Line height as a multiple of grid height| Positive integer | 3
$use-baseline-origin | Set the origin of leadings to the baseline | Boolean | false

> \* Baseline must be provided either in the defaults or in the mixin parameters.
>
> † Leadings are measured from either the baseline or the edges of the text block, depending on the `$use-baseline-origin` setting.
> 
> ‡ The default value is always calculated so there will be no visible gap above or below the text block.

**Output:** `font-size`, `line-height`, `margin-top`, `padding-top`, `padding-bottom`, `margin-bottom` properties with the same unit as the grid height.

### plumber-set-defaults
Sets up or changes default parameters to use.

**Parameters:** Same as the main mixin.

## License
MIT License
