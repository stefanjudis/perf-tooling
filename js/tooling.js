( function( document, tools ) {
  var activeFilters = [];

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
   * Add event handlers to watch
   * out for filter changes
   */
  function addFilterFunctionality() {
    var filters = document.getElementById( 'filters' );
    addEvent( filters, 'change', function( event ) {
      var index;

      if ( event.target.checked ) {
        activeFilters.push( event.target.dataset.type );
      } else {
        index = activeFilters.indexOf( event.target.dataset.type );
        activeFilters.splice( index, 1 );
      }

      _filterTools( activeFilters );
    } );
  }


  /**
   * Adjust list of tools
   * to only show the ones included in filters
   *
   * @param  {Array} activeFilters active filters
   */
  function _filterTools( activeFilters ) {
    var posts  = document.querySelectorAll( '.posts > li' );
    var length = activeFilters.length;

    tools.forEach( function( tool ) {
      var found = false;

      // cache element to avoid multiple
      // dom queries
      if ( tool.elem === undefined ) {
        tool.elem  = document.getElementById( tool.name.replace( ' ', '-' ) );
      }

      // iterate over active filters
      // and check if it fits
      for ( var i = 0; i < length; ++i ) {
        if ( !! tool[ activeFilters[ i ] ] ) {
          found = true;
        }
      }

      // show/hide
      if ( found || activeFilters.length === 0 ) {
        tool.elem.style.display = 'inline-block';
      } else {
        tool.elem.style.display = 'none';
      }
    } );
  }

  // load github avatars right after page load
  addEvent( window, 'load', function() {
    var contributors = document.querySelectorAll( '.contributor > a' );
    var length       = contributors.length;

    for( var i = 0; i < length; ++i ) {
      contributors[ i ].innerHTML = '<img src="' + contributors[ i ].dataset.url + '" width="42" height="42" title="' + contributors[ i ].dataset.login + '" class="contributor-avatar">';
    }
  } );

  addFilterFunctionality();
} )( document, tools );
