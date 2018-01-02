const config         = require( '../../config/config' );
const credentialsSet = !!config.youtube.token;


/**
 * Youtube API stuff
 */
const YoutubeAPI = ( require( 'youtube-api' ) );

YoutubeAPI.authenticate( {
  type : 'key',
  key  : config.youtube.token
} );


const Youtube = {
  /**
   * Fetch twitter meta for people
   */
  fetchVideoMeta : ( id, callback ) => {
    if ( credentialsSet ) {
      YoutubeAPI.videos.list( {
        part : 'snippet,statistics',
        id   : id
      }, ( error, data ) => {
        if ( error ) {
          return callback( error );
        }

        if ( data.items.length ) {
          var videoData = {
            publishedAt : new Date( data.items[ 0 ].snippet.publishedAt ),
            thumbnail   :  {
              url    : data.items[ 0 ].snippet.thumbnails.medium.url

            },
            title       : data.items[ 0 ].snippet.title,
            url         : 'https://www.youtube.com/watch?v=' + id
          };

          if ( data.items[ 0 ].statistics ) {
            videoData.stats = {
              viewCount    : data.items[ 0 ].statistics.viewCount,
              likeCount    : data.items[ 0 ].statistics.likeCount,
              dislikeCount : data.items[ 0 ].statistics.dislikeCount
            }
          }

          callback(
            null,
            videoData
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
            url    : 'http://placehold.it/295x166'

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
  init : () => Object.create( Youtube )
};
