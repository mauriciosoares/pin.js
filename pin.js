function Pin(container) {
	this.el = document.querySelector(container);
	this.$parentt = this.el.parentNode;

	this.init();
}

Pin.prototype.init = function() {
	this.bind();
	this.calcPositions();

	// simulates the window scroll, in case the user is already
	// in the middle of the scroll bar when the page loads (default browser action)
	this.onWindowScroll();
};

Pin.prototype.calcPositions = function() {
	this.positions = {
		offset: this.getOffset(this.el),
		parentOffset: this.getParentOffset(),
		stopTop: (this.$parentt.offsetHeight + this.getOffset(this.$parentt).top) - this.el.offsetHeight
	};
};

Pin.prototype.getOffset = function(element) {
	var de = document.documentElement;
	var box = element.getBoundingClientRect();

	return {
		top: box.top + window.pageYOffset - de.clientTop,
		left: box.left + window.pageXOffset - de.clientLeft
	};
};

Pin.prototype.getParentOffset = function() {
	return {
		left: this.el.offsetLeft
	}
};

Pin.prototype.bind = function() {
	window.onscroll = this.onWindowScroll.bind(this);
	window.onresize = this.reload.bind(this);
};

Pin.prototype.reload = function() {
	this.setCss();S
	this.calcPositions();
	this.onWindowScroll();
};

/**
* Lots of things happens on this method
* It checks the window size, the position of the scroll
* If the container is touching the bottom and other
* stuff. That's why it looks like a mess
* :|
**/
Pin.prototype.onWindowScroll = function() {
	var newTop;

	// if the window is smaller then it won't stick
	if(this.windowIsSmaller()) return;

	// if the window got to the bottom of the parent element
	// of the container element, it stops the element
	if(this.touchBottom()) return;
	newTop = window.scrollY - this.positions.offset.top;


	// some checks to stop unecessary code repetition
	if(newTop > 0 && this.getStyle(this.el, 'position') === 'fixed') return;
	if(newTop <= 0 && (this.getStyle(this.el, 'position') === 'relative' || this.getStyle(this.el, 'position') === 'static')) return;

	if(newTop > 0) {
		this.setCss({
			position: 'fixed',
			// adds the left and top property, minus the margins,
			// so the element sticks in the same position it was before
			left: this.toPx(this.positions.offset.left),
			top: 0,
			marginLeft: 0,
			marginTop: 0,
			bottom: ''
		});
		return;
	}

	this.setCss();
};

Pin.prototype.touchBottom = function() {
	// if the scroll passed the end of the parent
	if(window.scrollY > this.positions.stopTop) {
		if(this.getStyle(this.el, 'position') === 'absolute') return true;

		this.setCss({
			top: '',
			marginLeft: '',
			bottom: 0,
			position: 'absolute',
			left: this.toPx(this.positions.parentOffset.left)
		});

		return true;
	}

	return false;
};

Pin.prototype.setCss = function(properties) {
	if(!properties) {
		this.el.removeAttribute('style');
		return;
	}

	for(var property in properties) {
		this.el.style[property] = properties[property];
	}
};

Pin.prototype.getStyle = function(el, property) {
	return window.getComputedStyle(el)[property];
};

Pin.prototype.toPx = function(n) {
	return n + 'px';
};


Pin.prototype.windowIsSmaller = function() {
	return window.innerHeight < this.el.offsetHeight;
};
