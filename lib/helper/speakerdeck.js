var config         = require( '../../config/config' );
var request        = require( 'request' );

var Slideshare = {
  /**
   * Get meta for given slides
   *
   * @param  {String}   url      url
   * @param  {Function} callback callback
   */
  getMeta : function( url, callback ) {
    url = 'https://speakerdeck.com/oembed.json?url=' + url;

    request(
      {
        url     : url,
        headers : {
          'User-Agent' : 'perf-tooling.today'
        }
      },
      function( error, response, body ) {
        if ( error ) {
          return callback( error )
        } else {
          try {
            var meta = JSON.parse( body );
          } catch( e ) {
            return callback( e );
          }

          // let's see how long this
          // will work :P
          var id = /speakerdeck.com\/player\/(.*?)"/g.exec( meta.html )[ 1 ];

          return callback(
            null,
            {
              thumbnail : {
                url    : 'https://speakerd.s3.amazonaws.com/presentations/' + id + '/thumb_slide_0.jpg'
              },
              html      : meta.html,
              title     : meta.title
            }
          );
        }
      }
    );
  }
}

module.exports = {
  init : function() {
    return Object.create( Slideshare );
  }
}
