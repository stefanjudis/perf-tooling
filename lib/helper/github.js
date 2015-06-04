var config         = require( '../../config/config' );
var request        = require( 'request' );
var credentialsSet = config.github.id && config.github.token;

var Github = {
  /**
   * Get list of contributors
   *
   * @param  {Function} callback callback
   */
  getContributors : function( callback ) {
    if ( credentialsSet ) {
      request(
        {
          url     : 'https://api.github.com/repos/stefanjudis/perf-tooling/contributors?client_id=' + config.github.id + '&client_secret=' + config.github.token,
          headers : {
            'User-Agent' : 'perf-tooling.today'
          }
        },
        function( error, response, body ) {
          var contributors;

          if ( error ) {
            callback( error );
          }

          if ( response && response.statusCode === 200 ) {
            try {
              contributors = JSON.parse( body );
            } catch( e ) {
              contributors = false;
              console.log( error );
              console.log( response );
              console.log( e );

              return callback(
                new Error( e )
              );
            }

            callback( null, contributors );
          }
        }
      );
    } else {
      return callback(
        new Error( 'No Github id and token set!!!' )
      );
    }
  },


  /**
   * Get stars for given tool
   *
   * @param  {String}   tool     tool
   * @param  {Function} callback callback
   */
  getStars : function( tool, callback ) {
    if ( credentialsSet ) {
      var url = 'https://api.github.com/repos/' +
                  tool +
                  '?client_id=' + config.github.id +
                  '&client_secret=' + config.github.token;

      request(
        {
          url     : url,
          headers : {
            'User-Agent' : 'perf-tooling.today'
          }
        },
        function( error, response, body ) {
          var stars;

          if ( error ) {
            return callback( error );
          } else {
            if ( response && response.statusCode === 404 ) {
              return callback(
                new Error( 'NOT FOUND: ' + url )
              );
            } else {
              try {
                stars = JSON.parse( body ).stargazers_count;
              } catch( e ) {
                return callback( e );
              }

              return callback( null, stars );
            }
          }
        }
      );
    } else {
      return callback( null, ~~( Math.random() * 1000 ) );
    }
  }
};

module.exports = {
  init : function() {
    return Object.create( Github );
  }
};
