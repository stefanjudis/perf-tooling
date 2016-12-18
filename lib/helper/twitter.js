const config         = require( '../../config/config' );
const credentialsSet = config.twitter.consumer_key &&
                     config.twitter.consumer_secret &&
                     config.twitter.access_token &&
                     config.twitter.access_token_secret;
/**
 * Twitter api stuff
 */
if (
  credentialsSet
) {
  const Twit = require( 'twit' );
  const twit = new Twit( {
    consumer_key        : config.twitter.consumer_key,
    consumer_secret     : config.twitter.consumer_secret,
    access_token        : config.twitter.access_token,
    access_token_secret : config.twitter.access_token_secret
  } );
}


const Twitter = {
  /**
   * Fetch twitter meta for people
   */
  fetchTwitterUserData : function( userName, callback ) {
    if ( credentialsSet ) {
      twit.get(
        '/users/show/:id',
        { id : userName },
        function( err, twitterData ) {
          if ( err ) {
            return callback( err );
          }

          return callback(
            null,
            {
              description   : twitterData.description,
              followerCount : twitterData.followers_count,
              image         : twitterData.profile_image_url
            }
          );
      } );
    } else {
      callback(
        null,
        {
          description   : 'Some fancy description of xxx',
          followerCount : ~~( Math.random() * 10000 ),
          image         : 'http://placehold.it/48x48'
        }
      );
    }
  }
};

module.exports = {
  init : function() {
    return Object.create( Twitter );
  }
};
