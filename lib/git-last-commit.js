module.exports = function( callback ) {
  var spawn            = require( 'child_process' ).spawn;
  var lastCommit       = spawn(
                          'git',
                          [ 'log', '--pretty=format:"%ar"', '-1' ],
                          { 'LANG' : 'en_US.UTF' }
                        );
  var timeToLastCommit = ''

  lastCommit.stdout.on( 'data', function( data ) {
    timeToLastCommit += data;
  } );


  lastCommit.on( 'close', function ( code ) {
    lastCommit.stdin.end();

    if ( code !== 0 ) {
      var error = new Error( 'git execution was not successful' );

      return callback( error );
    }

    callback( null, timeToLastCommit );
  } );
}
