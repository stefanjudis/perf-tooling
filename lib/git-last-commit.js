module.exports = function( callback ) {
  const spawn            = require( 'child_process' ).spawn;
  const lastCommit       = spawn(
                          'git',
                          [ 'log', '--pretty=format:"%ar"', '-1' ],
                          { 'LANG' : 'en_US.UTF' }
                        );
  const timeToLastCommit = '';

  lastCommit.stdout.on( 'data', function( data ) {
    timeToLastCommit += data;
  } );


  lastCommit.on( 'close', function ( code ) {
    lastCommit.stdin.end();

    if ( code !== 0 ) {
      const error = new Error( 'git execution was not successful' );

      return callback( error );
    }

    callback( null, timeToLastCommit );
  } );
};
