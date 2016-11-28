# Plumber
_Real baseline grids with SASS_

Plumber helps you create better looking documents by adding vertical rhythm to your page easily.

## Installation

### Manual installation
Download and extract [the latest version](https://api.github.com/repos/jamonserrano/plumber-sass/zipball), move `_plumber.scss` into the vendor folder of your project and include it:

```sass
@include path/to/folder/plumber;
```

### NPM
Install:

```sh
$ npm install plumber-sass --save-dev
```
And include it from the node_modules folder of your project:

```scss
@include node_modules/plumber-sass/plumber;
```

### Bower
Install:

```sh
$ bower install plumber-sass --save-dev
```
And include it from the bower_components folder of your project:

```scss
@include bower_components/plumber-sass/plumber;
```

## Usage
1\. Set the height of the vertical grid in your preferred unit with the `$plumber-grid-height` global variable:

```scss
$plumber-grid-height: 12px; // Pixels
// or
$plumber-grid-height: 2rem; // Rems
```

2\. Look up the baseline of your font family in the table or use the measure tool. Put the result in the `$plumber-baseline` global variable.

```scss
$plumber-baseline: 0.121; // Helvetica Neue
```

3\. Include the plumber mixin in your styles. Each parameter should be a multiple of the grid height, only the font size can be a fraction.

```scss
h1 {
	@include plumber(
		$font-size: 4.5,
		$line-height: 6,
		$leading-top: 9,
		$leading-bottom: 3
	);
}

h2 {
	@include plumber(
		$font-size: 3.25,
		$line-height: 4,
		$leading-top: 6,
		$leading-bottom: 2
	);
}
```

### Using multiple fonts

When using multiple fonts or families, you can define a baseline for each and use it as the optional `$baseline` parameter:

```scss
$header-baseline: 0.121; // Helvetica Neue
$body-baseline: 0.151; // Georgia

h1 {
	@include plumber(
		$font-size: 4.5,
		$line-height: 6,
		$leading-top: 9,
		$leading-bottom: 3,
		$baseline: $header-baseline
	);
}

p {
	@include plumber(
		$font-size: 2,
		$line-height: 3,
		$leading-top: 2,
		$leading-bottom: 2,
		$baseline: $body-baseline
	);
}

```

### Responsive typography
Plumber supports responsive typography. Just specify the grid height in rems or other relative units, and the font metrics will change along.

```scss
$plumber-grid-height: 1rem;

p {
	@include plumber(
		$font-size: 2,
		$line-height: 3,
		$leading-top: 2,
		$leading-bottom: 2
	);
}

html {
	// grid height: 12px, paragraph font size: 18px
	font-size: 12px;
	
	// grid-height: 16px, paragraph font size: 24px
	@media screen and (min-width: 641px) {
		font-size: 16px;
	}
}
```

### Alternative leading calculation
Leadings are measured from the top and bottom edges of the text block by default. To measure them from the baseline, set the global `$plumber-leadings-from-baseline` variable to `true` before using the mixin:

```scss
$plumber-leadings-from-baseline: true;
```

## Considerations

### Precision
Due to SASS's precision, rounding, and browser text engines it's entirely possible that the rendered text will not sit _exactly_ on the baseline. This does not corrupt the grid as the different heights always add up to a whole gridline. Following these guidelines will get you closer to pixel perfection:

* Define grid height in pixels, or as a multiple of the base font height (e.g. 16px or 1rem).
* Use an even grid height (e.g. 8px).
* Use a grid height with many divisors (e.g. 12px).
* Use font sizes that produce whole numbers when multiplied with the grid height.

> Setting a base font size to 2 grid heights eliminates most inaccuracies.

### Varying baseline among fonts in the same family
Although some weights or styles in the same family can sit on different baselines, it's generally fine to use the one for the regular font. If pixel perfection is important, define individual baselines for each font.

### Viewport-specific units
While supported, specifying `$grid-height` in vh, vw, vmin, vmax is discouraged because this usually yields fractional pixels that can seriously hamper precision.

### Collapsing margins
Plumber's use of collapsing margins makes it possible to specify the minimum distance between blocks of texts. If you don't need this, you can omit either the `$leading-top` or the `$leading-bottom` parameter.


## API

### plumber
The main mixin.

**Parameters:**

Name | Description | Type | Default value
---- | ----------- | ---- | -------------
$font-size | Font size as a fraction of grid height | Positive number |
$line-height | Line height as a multiple of grid height| Positive integer |
$leading-top _(optional)_ | Top leading* as a multiple of grid height* | Integer | 0<sup>†</sup>
$leading-bottom _(optional)_ | Bottom leading* as a multiple of grid height | Integer | 0<sup>†</sup>
$grid-height _(optional)_ | Override the default grid height | Any unit | $plumber-grid-height |
$baseline _(optional)_ | Override the default baseline | Fraction between 0 and 1 | $plumber-baseline |


> \* Leadings are measured from either the baseline or the edges of the text block, depending on the value of `$plumber-leadings-from-baseline`. 
> 
> <sup>†</sup> The default value is always calculated so there will be no visible gap above or below the text block.

**Output:** `font-size`, `line-height`, `margin-top`, `padding-top`, `padding-bottom`, `margin-bottom` properties with the same unit as the grid height.


### $plumber-grid-height
Defines the global vertical grid height. Can be omitted if `$grid-height` is provided with every include.

**Type:** Any unit


### $plumber-baseline
Defines the global baseline. Can be omitted if `$baseline` is provided with every include.

**Type:** Fraction between 0 and 1


### $plumber-leadings-from-baseline
Changes the leading measurement from the edges of the text block to the baseline.

**Type**: Boolean

**Default value:** false

## License
MIT License