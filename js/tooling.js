( function( document, list ) {
  /**
   * Add event for mobile navigation
   */
  function initToggleNav() {
    var mainNav = document.querySelector( '.nav-main' );

    document.querySelector( '.btn-nav' ).addEventListener( 'click', function() {
      mainNav.classList.toggle( 'nav-open' );
    } );
  }

  // load github avatars right after page load
  window.addEventListener( 'load', function() {
    var contributors = document.querySelectorAll( '.contributor > a' );
    var length       = contributors.length;

    for( var i = 0; i < length; ++i ) {
      contributors[ i ].innerHTML = '<img src="' + contributors[ i ].dataset.url + '" width="40" height="40" alt="' + contributors[ i ].dataset.login + ' on GitHub" class="contributor-avatar">';
    }
  } );

  // add scrollLink behavior
  var scrollLinks = document.querySelectorAll( '.js-scroll' );

  if ( scrollLinks.length ) {
    Array.prototype.forEach.call( scrollLinks, function( link ) {
      link.addEventListener( 'click', function() {
        window.animScrollTo(
          document.getElementById( link.href.split( '#' )[ 1 ] ).offsetTop,
          600
        );
      } );
    } );
  }

  if ( typeof list !== 'undefined' && window.perfTooling.features.history ) {
    window.perfTooling.components.fuzzy.init( {
      elements : {
        input : '#fuzzzzzzzzzy',
        list  : '.posts'
      },
      data : list
    } );
  }

  initToggleNav();
} )( document, window.list );
