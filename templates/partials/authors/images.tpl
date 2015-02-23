<%=
  '<div class="post-author-imgs">' + _.map( authors, function( author ) {

    var twitterHandle = ( author.twitter ) ? author.twitter.replace( '@', '' ) : false;

    if ( twitterHandle && people[ twitterHandle ] ) {

      return '<a href="https://twitter.com/' + twitterHandle + '" title="Twitter profile of ' + author.name + '" target="_blank"><img src="' + people[ twitterHandle ].image + '" title="Image of ' + author.name + '"></a>';
    }

    return '';

    } ).join( '' ) + '</div>'
%>
