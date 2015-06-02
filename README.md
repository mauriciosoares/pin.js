# Pin.js

Finally a dependency free Pin plugin!

Pin.js pins (duh) your elements as you scroll.

It works on all standard modern browsers, and also supports mobile devices smoothly! (Safari on IOS and Chrome on Android)

## Install

You can install it using [Bower](http://bower.io/)

```
bower install pin.js
```

Or you can clone/[download](https://github.com/mauriciosoares/pin.js/archive/master.zip) the project.

## Usage

### With JS

1 - Import the pin.js script

```html
<script src="bower_components/pin.js/dist/pin.min.js"></script>
```

2 - Setup an element

```html
<div id="pin"></div>
```

3 - Pin it!

```js
new Pin('#pin');

// You can use a DOM reference as well
new Pin(document.getElementById('pin'));
```

### Without JS

1 - Import the pin.js script

```html
<script src="bower_components/pin.js/dist/pin.min.js"></script>
```

2 - Setup an element with a `data-pin` attribute

```html
<div id="pin" data-pin></div>
```

3 - After that you have to... wait! there's no step 3 :smile:

_You can use query selector to pin an element, but it'll take only the first element on the query._

## Documentation

### onPin - `Function`
Triggers a callback whenever the element is _pinned_.

__Usage__
```js
new Pin('#pin', {
  onPin: function() {
    // code
  }
});
```

### onUnpin - `Function`
Triggers a callback whenever the element is _unpinned_.

__Usage__
```js
new Pin('#pin', {
  onUnpin: function() {
    // code
  }
});
```

### onTouchBottom - `Function`
Triggers a callback whenever the element is _touches the bottom_ of its parent container.

__Usage__
```js
new Pin('#pin', {
  onTouchBottom: function() {
    // code
  }
});
```

### stopOnBottom - `Boolean` | Default `true`
Stops the element when it _touches the bottom_ of its parent container.

__Usage__
```js
new Pin('#pin', {
  stopOnBottom: true
});
```

### respectWindow - `Boolean` | Default `true`
If the height of the browser is _smaller than the pinned element_, it automatically gets unpinned

__Usage__
```js
new Pin('#pin', {
  respectWindow: true
});
```

## Methods

### reload
Whenever you change the size of the pinned element, you should trigger this method to recalculate the positions of the element.

__Usage__
```js
var pin = new Pin('#pin');

pin.reload();
```

### destroy
If you want to disable the __pin__ effect, use this method and it will unbind all events attached to `window` like `scroll` and `resize`.

__Usage__
```js
var pin = new Pin('#pin');

pin.destroy();
```

## Browser Support

![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) | ![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png)
--- | --- | --- | --- | --- |
<center>9 ✔</center> | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Maintainer

- Mauricio Soares - <http://github.com/mauriciosoares>

## Contributing

1. [Fork](http://help.github.com/forking/) Pin.js
2. Create a topic branch - `git checkout -b my_branch`
3. Push to your branch - `git push origin my_branch`
4. Send me a [Pull Request](https://help.github.com/articles/using-pull-requests)
5. That's it!

Please respect the indentation rules and code style.

## License

Pin.js is released under the MIT License. See [LICENSE](https://github.com/mauriciosoares/pin.js/blob/master/LICENSE) file for details.
