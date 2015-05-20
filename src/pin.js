(function(window, document) {
  'use strict';

  function Pin(container, options) {
    this.el = document.querySelector(container);
    this.parent = this.el.parentNode;

    this.setOptions(options);

    this.init();
  }

  Pin.prototype.setOptions = function(options) {
    this.options = {
      onPin: (options.onPin) ? options.onPin : function() {},
      onUnpin: (options.onUnpin) ? options.onUnpin : function() {},
      onTouchBottom: (options.onTouchBottom) ? options.onTouchBottom : function() {}
    };
  };

  Pin.prototype.init = function() {
    this.bind();
    this.calcPositions();

    // simulates the window scroll, in case the user is already
    // in the middle of the scroll bar when the page loads (default browser action)
    this.onWindowScroll();
  };

  Pin.prototype.destroy = function() {
    this.setCss();
    this.unbind();
  };

  Pin.prototype.calcPositions = function() {
    // if parent does not have a position
    // sets a position relative, that's because
    // the pinned element gets position absolute
    if(getStyle(this.parent, 'position') === 'static') {
      this.parent.style.position = 'relative';
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
    this.setCss();
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
    if(windowIsSmaller(this.el)) return;

    // if the window got to the bottom of the parent element
    // of the container element, it stops the element
    if(this.touchBottom()) return;
    newTop = window.pageYOffset - this.positions.offset.top;


    // some checks to stop unecessary code repetition
    if(newTop > 0 && getStyle(this.el, 'position') === 'fixed') return;
    if(newTop <= 0 && (getStyle(this.el, 'position') === 'relative' || getStyle(this.el, 'position') === 'static')) return;

    if(newTop > 0) {
      this.setCss({
        position: 'fixed',
        // adds the left and top property, minus the margins,
        // so the element sticks in the same position it was before
        left: toPx(this.positions.offset.left),
        top: 0,
        marginLeft: 0,
        marginTop: 0,
        bottom: ''
      });

      this.options.onPin(this);

      return;
    }

    this.setCss();
    this.options.onUnpin(this);
  };

  Pin.prototype.touchBottom = function() {
    // if the scroll passed the end of the parent
    if(window.pageYOffset > this.positions.stopTop) {
      if(getStyle(this.el, 'position') === 'absolute') return true;

      this.setCss({
        top: '',
        marginLeft: '',
        bottom: 0,
        position: 'absolute',
        left: toPx(this.positions.parentOffset.left)
      });

      this.options.onTouchBottom(this);

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

  /**
   * Private functions
   *
   * The functions below are not supposed to be used by the dev
   */

  function getStyle(el, property) {
    return window.getComputedStyle(el)[property];
  }

  function toPx(n) {
    return n + 'px';
  }

  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  function windowIsSmaller(el) {
    return window.innerHeight < el.offsetHeight;
  }

  window.Pin = Pin;

} (window, document));
