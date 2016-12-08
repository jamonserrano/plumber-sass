# Plumber
_Real baseline grids with SASS_

Create better looking documents and speed up CSS development by adding vertical rhythm to your page. Plumber positions every line of text on a gridline.

## Installation

### Manual
Download and extract [the latest release](https://api.github.com/repos/jamonserrano/plumber-sass/zipball), move `_plumber.scss` into the vendor folder of your project and include it:

```sass
@include vendor/plumber;
```

### NPM
Install:

```sh
$ npm install plumber-sass --save-dev
```
And include it in your project:

```scss
@include node_modules/plumber-sass/plumber;
```

### Bower
Install:

```sh
$ bower install plumber-sass --save-dev
```
And include it in your project:

```scss
@include bower_components/plumber-sass/plumber;
```

## Usage
1\. Decide on the grid height you will use in the unit of your choice (pixels or rems are recommended).

2\. Look up the baseline of your font(-family) [in the table](https://jamonserrano.github.io/plumber-sass/table/) or [use the measure tool](https://jamonserrano.github.io/plumber-sass/measure/). For exapmle the value for Helvetica Neue is 0.121.

3\. Include the plumber mixin in your styles – specify font size, line height, top and bottom leadings as multiples of the grid height:

```scss
h1 {
	@include plumber(
		$grid-height: 1rem,
		$baseline: 0.121,
		$font-size: 4.5,
		$line-height: 6,
		$leading-top: 9,
		$leading-bottom: 3
	);
}

p {
	@include plumber(
		$grid-height: 1rem,
		$baseline: 0.121,
		$font-size: 2,
		$line-height: 3,
		$leading-top: 0,
		$leading-bottom: 1
	);
}
```

### Default settings
To avoid repetition set up default values before using the mixin:

```scss
@include plumber-set-defaults(
	$grid-height: 1rem,
	$baseline: 0.121,
	$font-size: 2,
	$line-height: 3,
	$leading-top: 0,
	$leading-bottom: 1
);

p {
	// using only default values
	@include plumber();
}

li {
	// override leadings
	@include plumber(
		leading-top: 1,
		leading-bottom: 2
	);
}
```

### Using multiple fonts

When using multiple fonts or families, you can set a baseline for each one and use the optional `$baseline` parameter:

```scss
$quote-baseline: 0.151; // Georgia

blockquote {
	@include plumber(
		$baseline: $quote-baseline
	);
}

```

### Responsive typography
Plumber supports responsive typography. Just define the grid height in rems or other relative units, and the font metrics will change along.

```scss
@include plumber-set-defaults(
	$grid-height: 1rem,
	$font-size: 2
);

html {
	font-size: 8px;
	// grid height => 8px, font size => 16px
	
	@media screen and (min-width: 641px) {
		font-size: 12px;
		// grid-height => 12px, font size => 24px
	}
}
```

### Alternative leading calculation
Leadings are measured from the top and bottom edges of the text block by default. To measure them from the baseline, set `$use-baseline-origin: true` before using the mixin:

```scss
@include plumber-set-defaults(
	$use-baseline-origin: true
);
```

## Considerations

### Precision
Due to SASS’s precision, rounding, and browser rendering it’s entirely possible that the text will not sit exactly on the baseline. Following these guidelines will get you closer to pixel perfection:

* Define grid height in pixels, or as a multiple of the base font height.
* Use a grid height with many divisors.
* Use font sizes that produce whole numbers with the grid height.

### Varying baseline among fonts in the same family
Although some weights or styles in the same family can sit on different baselines, it’s generally fine to use the one for the regular font. If pixel perfection is important, set individual baselines for each font.

### Viewport-specific units
While supported, specifying the grid height in vh, vw, vmin, vmax is discouraged because this usually yields fractional pixels that can seriously hamper precision.

### Collapsing margins
Plumber’s use of collapsing margins makes it possible to set the minimum distance between blocks of texts. If you don’t need this, you can set either `$leading-top` or `$leading-bottom` to 0.


## API

### plumber
The main mixin.

**Parameters:** All parameters are optional, default values can be changed with `plumber-set-defaults`.


Name | Description | Type | Default value
---- | ----------- | ---- | -------------
$baseline | Override the default baseline | Fraction between 0 and 1 | —
$font-size | Font size as a fraction of the grid height | Positive number | 2
$grid-height | Override the default grid height | Any unit | 1rem
$leading-top | Top leading* as a multiple of grid height | Integer | 0**
$leading-bottom | Bottom leading* as a multiple of grid height | Integer | 0**
$line-height | Line height as a multiple of grid height| Positive integer | 3
$use-baseline-origin | Set the origin of leadings to the baseline | Boolean | false

> * Leadings are measured from either the baseline or the edges of the text block, depending on the `$plumber-leadings-from-baseline` setting.
> 
> ** The default value is always calculated so there will be no visible gap above or below the text block.

**Output:** `font-size`, `line-height`, `margin-top`, `padding-top`, `padding-bottom`, `margin-bottom` properties with the same unit as the grid height.

### plumber-set-defaults
Sets up or changes default parameters to use.

**Parameters:** Same as the main mixin

## License
MIT License
