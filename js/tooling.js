( function( document, list ) {
  /**
   * Cached essential elements
   * to avoid DOM queries
   *
   * @type {Object}
   */
  var elements = {
    noResultsMsg : document.getElementById( 'noResultMsg' )
  };

  /**
   * Attach event listener to given event
   *
   * THX to John Resig
   * http://ejohn.org/projects/flexible-javascript-events/
   *
   * @param {Object}   obj  dom element
   * @param {String}   type event type
   * @param {Function} fn   event listener
   */
  function addEvent( obj, type, fn ) {
    if ( obj.attachEvent ) {
      obj[ 'e' + type + fn ] = fn;
      obj[ type + fn ]       = function() {
        obj[ 'e' + type + fn ]( window.event );
      };
      obj.attachEvent( 'on'+type, obj[ type + fn ] );
    } else {
      obj.addEventListener( type, fn, false );
    }
  }


  /**
   * Shiming requestAnimationFrame
   * @return {Function} requestAnimationFrame
   */
  var requestAnimFrame = ( function() {
    return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function( callback ) { window.setTimeout( callback, 1000 / 60 ); };
  } )();


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
   * @param  {[type]}   to       [description]
   * @param  {Function} callback [description]
   * @param  {[type]}   duration [description]
   * @return {[type]}            [description]
   */
  function scrollTo( to, duration ) {
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
        requestAnimFrame( animateScroll );
      }
    };

    animateScroll();
  }


  /**
   * Add event handlers to watch
   * out for filter changes
   */
  function addFuzzySearch() {
    var fuzzy = document.getElementById( 'fuzzzzzzzzzy' );
    addEvent( fuzzy, 'keyup', function( event ) {
      _filterListEntries( event.target.value.toLowerCase() );
    } );
  }


  /**
   * Add event for mobile navigation
   */
  function initToggleNav() {
    var mainNav = document.querySelector( '.nav-main' );

    addEvent( document.querySelector( '.btn-nav' ), 'click', function() {
      mainNav.classList.toggle( 'nav-open' );
    } );
  }

  /**
   * Adjust list of tools
   * to only show the ones match the fuzzy term
   *
   * @param  {String} searchTearm searchTerm
   */
  function _filterListEntries( searchTerm ) {
    var count       = 0;
    var searchTerms = searchTerm.split( ' ' );
    var length = searchTerms.length;

    list.forEach( function( entry ) {
      var i      = 0;
      var match  = true;

      // cache element to avoid multiple
      // dom queries
      if ( entry.elem === undefined ) {
        entry.elem  = document.getElementById( entry.name );
      }

      for( ; i < length; ++i ) {
        if ( entry.fuzzy.indexOf( searchTerms[ i ] ) === -1 ) {
          match = false;
        }
      }

      // show/hide
      if ( match ) {
        ++count;

        entry.elem.style.display = 'block';
      } else {
        entry.elem.style.display = 'none';
      }
    } );

    elements.noResultsMsg.classList.toggle( 'is-hidden', count !== 0 );
  }

  // load github avatars right after page load
  addEvent( window, 'load', function() {
    var contributors = document.querySelectorAll( '.contributor > a' );
    var length       = contributors.length;

    for( var i = 0; i < length; ++i ) {
      contributors[ i ].innerHTML = '<img src="' + contributors[ i ].dataset.url + '" width="40" height="40" title="' + contributors[ i ].dataset.login + '" class="contributor-avatar">';
    }
  } );

  // add scrollLink behavior
  var scrollLinks = document.querySelectorAll( '.js-scroll' );

  if ( scrollLinks.length ) {
    Array.prototype.forEach.call( scrollLinks, function( link ) {
      addEvent( link, 'click', function() {
        scrollTo(
          document.getElementById( link.href.split( '#' )[ 1 ] ).offsetTop,
          600
        );
      } );
    } );
  }

  if ( typeof list !== 'undefined' ) {
    addFuzzySearch();
  }

  initToggleNav();
} )( document, window.list );
