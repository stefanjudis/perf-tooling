const config         = require( '../../config/config' );
const credentialsSet = config.vimeo.clientId &&
                      config.vimeo.clientSecret &&
                      config.vimeo.accessToken;

/**
 * Vimeo api stuff
 */
const VimeoAPI = require( 'vimeo-api' ).Vimeo;
const vimeo = new VimeoAPI(
  config.vimeo.clientId,
  config.vimeo.clientSecret,
  config.vimeo.accessToken
);

const Vimeo = {
  /**
   * Fetch twitter meta for people
   */
  fetchVideoMeta : function( id, callback ) {
    if ( credentialsSet ) {
      vimeo.request( {
        path : '/videos/' + id
      }, function( error, body ) {
        if ( error ) {
          return callback( error );
        }

        return callback(
          null,
          {
            duration    : body.duration / 60,
            publishedAt : new Date( body.created_time ),
            thumbnail   : {
              url    : body.pictures.sizes[ 2 ].link
            },
            stats       : {
              viewCount : body.stats.plays,
              likeCount : body.metadata.connections.likes.total
            },
            title       : body.name,
            url         : body.link
          }
        );
      } );
    } else {
      callback(
        null,
        {
          publishedAt : new Date(),
          thumbnail   :  {
            url    : 'http://placehold.it/295x166'

          },
          stats       : {
            viewCount    : ~~( Math.random() * 10000 ),
            likeCount    : ~~( Math.random() * 10000 ),
            dislikeCount : ~~( Math.random() * 10000 )
          },
          title       : 'Dummy title because VIMEO credentials are not set',
          url         : 'https://www.youtube.com'
        }
      );
    }
  }
};

module.exports = {
  init : function() {
    return Object.create( Vimeo );
  }
};
