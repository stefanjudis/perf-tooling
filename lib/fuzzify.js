module.exports = function fuzzify ( object, includedKeys ) {
  if ( Array.isArray( object ) ) {
    return object.map( map ).join( ' ' );
  }

  return Object
    .keys( object )
    .map( p => includeKey( p ) + map( object [ p ] ))
    .join( ' ' );

  function map( object ) {
    return /object/i.test( typeof object ) ?
            fuzzify( object, includedKeys ) :
            object;
  }

  function includeKey( k ) {
    return ~ includedKeys.indexOf( k ) ? k + ' ' : '';
  }
};
