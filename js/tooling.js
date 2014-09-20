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
   * Fetch contributor data from github
   * and append contributors to the page
   */
  function displayContributors() {
    var request = new XMLHttpRequest(),
        contributors = {},
        htmlTarget = document.querySelectorAll( '#contributors' )[ 0 ],
        html = '<p>...with a little help from his friends:</p>';

    request.open(
      'GET',
      'https://api.github.com/repos/stefanjudis/perf-tooling/contributors',
      true
    );

    request.onload = function () {
      if (request.status == 200){
        // We got the data!
        contributors = JSON.parse( request.responseText );

        // Open <ul>
        html += '<ul>';

        // For each contributor, build a little avatar link.
        contributors.forEach( function ( user ) {
          if ( user.login !== 'stefanjudis' ) {
            html += '<li><a href="' + user.url.replace('api.','').replace('users/','') + '"><img src="' + user.avatar_url + '&s=42" alt="' + user.login + '" class="contributor-avatar"></a></li>';
          }
        } );

        // Close the <ul>
        html += '</ul>';

        // Insert markup
        htmlTarget.innerHTML = html;
      } else if ( request.status == 403 ) {
        // 403 happens when you hit rate-limit.
        // @see https://developer.github.com/v3/#rate-limiting
        console.log(
          'We found GH, but it returned an error. No contributors list this time :('
        );
      }
    };

    request.onerror = function() {
      console.log( 'Could not load contributors JSON. Not sure why :(' );
    };
    request.send();
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

  displayContributors();
  addFilterFunctionality();
} )( document, tools );
