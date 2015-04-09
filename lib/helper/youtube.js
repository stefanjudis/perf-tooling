var config         = require( '../../config/config' );
var credentialsSet = !!config.youtube.token;


/**
 * Youtube API stuff
 */
var YoutubeAPI = ( require( 'youtube-api' ) );

YoutubeAPI.authenticate( {
  type : 'key',
  key  : config.youtube.token
} );


var Youtube = {
  /**
   * Fetch twitter meta for people
   */
  fetchVideoMeta : function( id, callback ) {
    if ( credentialsSet ) {
      YoutubeAPI.videos.list( {
        part : 'snippet,statistics',
        id   : id
      }, function( error, data ) {
        if ( error ) {
          return callback( error );
        }

        if ( data.items.length ) {
          callback(
            null,
            {
              publishedAt : new Date( data.items[ 0 ].snippet.publishedAt ),
              thumbnail   :  {
                url    : data.items[ 0 ].snippet.thumbnails.medium.url,
                width  : data.items[ 0 ].snippet.thumbnails.medium.width,
                height : data.items[ 0 ].snippet.thumbnails.medium.height,

              },
              stats       : {
                viewCount    : data.items[ 0 ].statistics.viewCount,
                likeCount    : data.items[ 0 ].statistics.likeCount,
                dislikeCount : data.items[ 0 ].statistics.dislikeCount
              },
              title       : data.items[ 0 ].snippet.title,
              url         : 'https://www.youtube.com/watch?v=' + id
            }
          );
        } else {
          callback(
            new Error(  'No video matching the YoutubeId' )
          );
        }
      } );
    } else {
      callback(
        null,
        {
          publishedAt : new Date(),
          thumbnail   :  {
            url    : 'http://placehold.it/320x180',
            width  : 320,
            height : 180,

          },
          stats       : {
            viewCount    : ~~( Math.random() * 10000 ),
            likeCount    : ~~( Math.random() * 10000 ),
            dislikeCount : ~~( Math.random() * 10000 )
          },
          title       : 'Dummy title because YOUTUBE credentials are not set',
          url         : 'https://www.youtube.com'
        }
      );
    }
  }
};

module.exports = {
  init : function() {
    return Object.create( Youtube );
  }
};
