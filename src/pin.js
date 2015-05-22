(function(window, document) {
  'use strict';

  function Pin(el, options) {
    this.el = (typeof el === 'string') ? document.querySelector(el) : el;
    this.parent = this.el.parentNode;

    this.setOptions(options || {});

    this.init();
  }

  Pin.prototype.setOptions = function(options) {
    this.options = {
      onPin: (options.onPin !== undefined) ? options.onPin : Pin.noop,
      onUnpin: (options.onUnpin !== undefined) ? options.onUnpin : Pin.noop,
      onTouchBottom: (options.onTouchBottom !== undefined) ? options.onTouchBottom : Pin.noop,
      stopOnBottom: (options.stopOnBottom !== undefined) ? options.stopOnBottom : true,
    };
  };

  Pin.prototype.init = function() {
    this.createHelperElement();
    this.bind();
    this.calcPositions();

    // simulates the window scroll, in case the user is already
    // in the middle of the scroll bar when the page loads (default browser action)
    this.onWindowScroll();
  };

  Pin.prototype.createHelperElement = function() {
    this.helperDiv = document.createElement(this.el.tagName);
    Pin.setStyle(this.helperDiv, {
      position: Pin.getStyle(this.el, 'position'),
      width: Pin.getStyle(this.el, 'width'),
      height: Pin.getStyle(this.el, 'height'),
      float: Pin.getStyle(this.el, 'float'),
      display: 'none',
      visibility: 'hidden'
    });

    this.parent.insertBefore(this.helperDiv, this.el);
  };

  Pin.prototype.showHelperElement = function(show) {
    Pin.setStyle(this.helperDiv, {
      display: (show === false) ? 'none' : 'block'
    });
  };

  Pin.prototype.destroy = function() {
    Pin.setStyle(this.el);
    this.unbind();
  };

  Pin.prototype.calcPositions = function() {
    // if parent does not have a position
    // sets a position relative, that's because
    // the pinned element gets position absolute
    if(Pin.getStyle(this.parent, 'position') === 'static') {
      Pin.setStyle(this.parent, {
        position: 'relative'
      });
    }

    this.positions = {
      offset: this.getOffset(this.el),
      parentOffset: this.getParentOffset(),
      stopTop: (this.parent.offsetHeight + this.getOffset(this.parent).top) - this.el.offsetHeight
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
    };
  };

  Pin.prototype.bind = function() {
    // need to attach to a seperate variable, since bind
    // creates another wraped function, and I can't unbind
    // it in the destroy method.
    this.reloadBind = this.reload.bind(this);
    this.onWindowScrollBind = this.onWindowScroll.bind(this);

    window.addEventListener('resize', this.reloadBind);
    window.addEventListener('scroll', this.onWindowScrollBind);
  };

  Pin.prototype.unbind = function() {
    window.removeEventListener('resize', this.reloadBind);
    window.removeEventListener('scroll', this.onWindowScrollBind);
  };

  Pin.prototype.reload = function() {
    this.showHelperElement(false);
    Pin.setStyle(this.el);
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
    if(Pin.windowIsSmaller(this.el)) return;

    // if the window got to the bottom of the parent element
    // of the container element, it stops the element
    if(this.touchBottom()) return;
    newTop = window.pageYOffset - this.positions.offset.top;


    // some checks to stop unecessary code repetition
    if(newTop > 0 && Pin.getStyle(this.el, 'position') === 'fixed') return;
    if(newTop <= 0 && (Pin.getStyle(this.el, 'position') === 'relative' || Pin.getStyle(this.el, 'position') === 'static')) return;

    if(newTop > 0) {
      Pin.setStyle(this.el, {
        position: 'fixed',
        // adds the left and top property, minus the margins,
        // so the element sticks in the same position it was before
        left: Pin.toPx(this.positions.offset.left),
        top: 0,
        marginLeft: 0,
        marginTop: 0,
        bottom: ''
      });

      this.options.onPin(this);
      this.showHelperElement();

      return;
    }

    Pin.setStyle(this.el);
    this.options.onUnpin(this);
    this.showHelperElement(false);
  };

  Pin.prototype.touchBottom = function() {
    if(!this.options.stopOnBottom) return false;
    // if the scroll passed the end of the parent
    if(window.pageYOffset > this.positions.stopTop) {
      if(Pin.getStyle(this.el, 'position') === 'absolute') return true;

      Pin.setStyle(this.el, {
        top: '',
        marginLeft: '',
        bottom: 0,
        position: 'absolute',
        left: Pin.toPx(this.positions.parentOffset.left)
      });

      this.options.onTouchBottom(this);
      this.showHelperElement();

      return true;
    }

    return false;
  };

  /**
   * "Private" functions
   *
   * The functions below are not supposed to be used by the dev
   */

  Pin.setStyle = function(el, properties) {
    if(!properties) {
      el.removeAttribute('style');
      return;
    }

    for(var property in properties) {
      el.style[property] = properties[property];
    }
  };

  Pin.getStyle = function(el, property) {
    return (property) ? window.getComputedStyle(el)[property] : window.getComputedStyle(el);
  };

  Pin.toPx = function(n) {
    return n + 'px';
  };

  Pin.windowIsSmaller = function(el) {
    return window.innerHeight < el.offsetHeight;
  };

  Pin.init = function() {
    var pinElements = Array.prototype.slice.call(document.querySelectorAll('[data-pin]'));

    pinElements.forEach(function(e) {
      new Pin(e);
    });
  };

  Pin.noop = function() {};

  window.Pin = Pin;

  /**
   * Initialization
   *
   * Automatically searches for elements in
   * the DOM with the data-pin attribute
   */

  if(typeof Document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', Pin.init);
  }

} (window, document));
