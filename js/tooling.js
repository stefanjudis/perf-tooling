( function( document, list ) {
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
  function addFuzzySearch() {
    var fuzzy = document.getElementById( 'fuzzzzzzzzzy' );
    addEvent( fuzzy, 'keyup', function( event ) {
      _filterListEntries( event.target.value.toLowerCase() );
    } );
  }


  /**
   * Adjust list of tools
   * to only show the ones match the fuzzy term
   *
   * @param  {String} searchTearm searchTerm
   */
  function _filterListEntries( searchTerm ) {
    list.forEach( function( entry ) {
      // cache element to avoid multiple
      // dom queries
      if ( entry.elem === undefined ) {
        entry.elem  = document.getElementById( entry.name );
      }

      // show/hide
      if ( entry.fuzzy.indexOf( searchTerm ) !== -1 ) {
        entry.elem.style.display = 'block';
      } else {
        entry.elem.style.display = 'none';
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

  // add scrollLink behavior
  var scrollLinks = document.querySelectorAll( '.js-scroll' );

  if ( scrollLinks.length ) {
    for ( var i = 0; i < scrollLinks.length; ++i ) {
      addEvent( scrollLinks[ i ], 'click', function() {
        window.scrollTo( 0, 1000, 'smooth' );
      } );
    }
  }

  if ( typeof list !== 'undefined' ) {
    addFuzzySearch();
  }
} )( document, window.list );
