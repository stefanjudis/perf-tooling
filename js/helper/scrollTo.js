( function( window ) {
  /**
   * Animated scroll function
   * shamelessly taken from
   *
   * https://gist.github.com/james2doyle/5694700
   */
  Math.easeInOutQuad = function ( t, b, c, d ) {
    t /= d / 2;
    if ( t < 1 ) {
      return c / 2 * t * t + b;
    }
    t--;
    return -c/2 * ( t * ( t-2 ) - 1 ) + b;
  };

  Math.easeInCubic = function( t, b, c, d ) {
    var tc = ( t/=d ) * t * t;
    return b + c * ( tc );
  };

  Math.inOutQuintic = function( t, b, c, d ) {
    var ts = ( t/=d ) * t,
    tc = ts * t;
    return b + c * ( 6 * tc * ts + -15 * ts * ts + 10 * tc );
  };

  /**
   * Scroll to
   * @param  {Number}   to       position to scroll to
   * @param  {Number}   duration scroll duration
   * @param  {Function} callback callback
   */
  function scrollTo( to, duration, callback ) {
    // figure out if this is moz || IE because they use documentElement
    var doc         = ( navigator.userAgent.indexOf( 'Firefox' ) !== -1 || navigator.userAgent.indexOf( 'MSIE' ) !== -1 ) ?
                      document.documentElement :
                      document.body,
        start       = doc.scrollTop,
        change      = to - start,
        currentTime = 0,
        increment   = 20;

    duration    = ( typeof( duration ) === 'undefined' ) ? 500: duration;

    var animateScroll = function(){
      // increment the time
      currentTime += increment;
      // find the value with the quadratic in-out easing function
      var val = Math.easeInOutQuad( currentTime, start, change, duration );
      // move the document.body
      doc.scrollTop = val;
      // do the animation unless its over
      if( currentTime < duration ) {
        window.requestAnimationFrame( animateScroll );
      } else {
        if ( typeof callback === 'function' ) {
          callback();
        }
      }
    };

    animateScroll();
  }

  window.animScrollTo = scrollTo;
} )( window );
