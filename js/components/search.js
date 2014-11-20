/**
 * Copied from modernizr
 *
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 */
( function( window ) {
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
   * Add event handlers to watch
   * out for filter changes
   */
  function addFuzzySearch( options ) {
    options = options || {};

    if ( options.data ) {
      if ( options.elements.input ) {
        elements.input = document.querySelector( options.elements.input );

        elements.input.addEventListener( 'keyup', function( event ) {
          if (
            event.which !== 40 &&
            event.which !== 38
          ) {
            _filterListEntries( options.data, event.target.value.toLowerCase() );
          }
        } );

        elements.input.addEventListener( 'search', function( event ) {
          _filterListEntries( options.data, event.target.value.toLowerCase() );
        } );
      }

      if ( options.elements.list ) {
        elements.list = document.querySelector( options.elements.list );

        elements.list.addEventListener( 'click', function( event ) {
          var fuzzyValue = event.target.dataset.fuzzy;
          if ( fuzzyValue && elements.input ) {
            event.preventDefault();

            if (
              elements.input.getBoundingClientRect().top < 0
            ) {
              window.animScrollTo(
                elements.input.offsetTop,
                600,
                function() {
                  elements.input.value = fuzzyValue;
                  elements.input.dispatchEvent(
                    new KeyboardEvent(
                      'keyup'
                    )
                  );
                }
              );
            } else {
              elements.input.value = fuzzyValue;
              elements.input.dispatchEvent(
                new KeyboardEvent(
                  'keyup'
                )
              );
            }
          }
        } );
      }
    }

  }


  /**
   * Adjust list of tools
   * to only show the ones match the fuzzy term
   *
   * @param  {String} searchTearm searchTerm
   */
  function _filterListEntries( list, searchTerm ) {
    window.setTimeout( function() {
      history.replaceState( null, null, '?q=' + searchTerm );
    }, 100 );

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
      }

      entry.elem.classList.toggle( 'is-hidden', !match );
    } );

    elements.noResultsMsg.classList.toggle( 'is-hidden', count !== 0 );
  }

  window.perfTooling = window.perfTooling || {};
  window.perfTooling.components = window.perfTooling.components || {};
  window.perfTooling.components.fuzzy = {
    init   : function( options ) {
      addFuzzySearch( options );
    }
  };
} )( window );
