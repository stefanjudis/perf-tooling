( function( window ) {
  /**
   * Shiming requestAnimationFrame
   * @return {Function} requestAnimationFrame
   */
  window.requestAnimationFrame = ( function() {
    return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function( callback ) { window.setTimeout( callback, 1000 / 60 ); };
  } )();
} )( window );
