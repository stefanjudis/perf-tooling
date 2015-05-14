/*! EnhanceJS: a progressive enhancement boilerplate. Copyright 2014 @scottjehl, Filament Group, Inc. Licensed MIT */
( function( window, undefined ) {

  // Enable JS strict mode
  'use strict';

  var setTimeout = window.setTimeout;
  var enhance    = {};

  // Define some variables to be used throughout this file
  var doc  = window.document,
      head = doc.head || doc.getElementsByTagName( 'head' )[ 0 ],
      // this references a meta tag's name whose content attribute should define the path to the full CSS file for the site
      fullCSSKey  = 'maincss';

  /**
   * Load a CSS file asynchronously.
   * Included from https://github.com/filamentgroup/loadCSS/
   *
   * @param {String} href        - The URL for your CSS file
   * @param {HTMLElement} before - Optionally defines the element used as a reference for injecting the <link>
   * @param {String} media       - Link's element media attribute value
   *
   * @returns {HTMLElement}      - Generated link element for the css styles
   */
  function loadCSS( href, before, media ) {
    var ss = window.document.createElement( 'link' );
    var ref = before || window.document.getElementsByTagName( 'script' )[ 0 ];
    var sheets = window.document.styleSheets;
    ss.rel = 'stylesheet';
    ss.href = href;
    // temporarily, set media to something non-matching to ensure it'll fetch without blocking render
    ss.media = 'only x';
    // inject link
    // note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
    ref.parentNode.insertBefore( ss, ref );
    // This function sets the link's media back to `all` so that the stylesheet applies once it loads
    // It is designed to poll until document.styleSheets includes the new sheet.
    function toggleMedia() {
      var defined;
      for ( var i = 0; i < sheets.length; i++ ) {
        if ( sheets[ i ].href && sheets[ i ].href.indexOf( href ) > -1 ) {
          defined = true;
        }
      }
      if ( defined ) {
        ss.media = media || "all";
      }
      else {
        setTimeout( toggleMedia );
      }
    }

    toggleMedia();
    return ss;
  }

  enhance.loadCSS = loadCSS;

  /**
   * Get a meta tag by name.
   * Meta tag must be in the HTML source before this script is included
   * in order to guarantee it'll be found.
   *
   * @param {String} metaname - The name attribute of the meta element
   * @returns {String}        - The meta content
   */
  function getMeta( metaname ) {
    var metas = window.document.getElementsByTagName( 'meta' );
    var meta;
    for ( var i = 0; i < metas.length; i ++ ) {
      if ( metas[ i ].name && metas[ i ].name === metaname ) {
        meta = metas[ i ];
        break;
      }
    }
    return meta;
  }

  enhance.getMeta = getMeta;

  /**
   * Cookie functionality.
   * Included from https://github.com/filamentgroup/cookie/
   *
   * @param {String} name                     - Cookie name
   * @param {String | Boolean | Number} value - Cookie value
   * @param {Number} days                     - Expiration days
   * @returns {String | Null }                - Set the cookie or return the value
   */
  function cookie( name, value, days ) {
    var expires;
    // if value is undefined, get the cookie value
    if ( value === undefined ) {
      var cookiestring = '; ' + window.document.cookie;
      var cookies = cookiestring.split( '; ' + name + '=' );
      if ( cookies.length == 2 ) {
        return cookies.pop().split( ';' ).shift();
      }
      return null;
    } else {
      // if value is a false boolean, we'll treat that as a delete
      if ( value === false ) {
        days = -1;
      }
      if ( days ) {
        var date = new Date();
        date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
        expires = '; expires=' + date.toGMTString();
      }
      else {
        expires = '';
      }
      window.document.cookie = name + '=' + value + expires + '; path=/';
    }
  }

  enhance.cookie = cookie;

  /**
   * Load non-critical CSS async on first visit.
   * For more info:  https://github.com/filamentgroup/enhance
   */
  var cssRevision = getMeta( fullCSSKey );
  if ( cssRevision && !cookie( fullCSSKey ) ) {
    loadCSS( cssRevision.content );

    // set cookie to mark this file fetched
    cookie( fullCSSKey, cssRevision.content.slice( 0, -4 ).split( '-' )[ 1 ], 7 );
  }

  /**
   * Enhancements for qualified browsers - 'Cutting the Mustard'.
   * Add your qualifications for major browser experience divisions here.
   * For example, you might choose to only enhance browsers that support document.querySelector (IE8+, etc).
   * Use case will vary.
   */
  if( !( 'querySelector' in doc ) ){
    // basic browsers: last stop here!
    return;
  }

  /**
   * Expose the 'enhance' object globally.
   * Use it to expose anything in here that's useful to other parts of the application.
   */
  window.enhance = enhance;

}( this ) );
