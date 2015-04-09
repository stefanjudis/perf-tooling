var request        = require( 'request' );

var Slideshare = {
  /**
   * Get meta for given slides
   *
   * @param  {String}   url      url
   * @param  {Function} callback callback
   */
  getMeta : function( url, callback ) {
    url = 'http://www.slideshare.net/api/oembed/2?url=' + url +
                '&format=json';

    request(
      {
        url     : url,
        headers : {
          'User-Agent' : 'perf-tooling.today'
        }
      },
      function( error, response, body ) {
        var meta;

        if ( error ) {
          return callback( error );
        } else {
          try {
            meta = JSON.parse( body );
          } catch( e ) {
            return callback( e );
          }

          return callback(
            null,
            {
              thumbnail : {
                url    : meta.thumbnail,
                width  : meta.thumbnail_width,
                height : meta.thumbnail_height
              },
              html      : meta.html,
              stats     : {
                length : meta.total_slides
              },
              title     : meta.title
            }
          );
        }
      }
    );
  }
};

module.exports = {
  init : function() {
    return Object.create( Slideshare );
  }
};
