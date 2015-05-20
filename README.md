# Pin.js

Finally dependency free Pin plugin!

Pin.js pins (duh) your elements as you scroll.

It works on all standard modern browsers, and also supports mobile devices smoothly! (Safari on IOS and Chrome on Android)

## Install

You can install it using [Bower](http://bower.io/)

```
bower install pin.js
```

Or you can clone/[download](https://github.com/mauriciosoares/pin.js/archive/master.zip) the project.

## Usage

1. Import the pin.js script

```html
<script src="bower_components/pin.js/dist/pin.min.js"></script>
```

2. Setup an element

```html
<div id="pin"></div>
```

3. Pin it!

```js
new Pin('#pin')
```

You can use query selector to pin an element, but it'll take only the first element on the query.

## Gotchas

Pin.js will create a fake element to display on the same position of the element whenever it is pinned. Some properties will be cloned like `width`, `height`, `float`, `position` and `display`.

If the parent element doesn't have any position (`static`) when the pinned element touches the bottom it'll automatically be set to `relative`.

## Browser Support

![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) | ![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png)
--- | --- | --- | --- | --- |
<center>9 ✔</center> | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |
