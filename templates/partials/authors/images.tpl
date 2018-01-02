<%=
  '<div class="media__obj--left">' + authors.map( author => {

    var twitterHandle = ( author.twitter ) ? author.twitter.replace( '@', '' ) : false;

    if ( twitterHandle && people[ twitterHandle ] && people[ twitterHandle ].image ) {

      return '<a href="https://twitter.com/' + twitterHandle + '" title="Twitter profile of ' + author.name + '" target="_blank"><img src="' + people[ twitterHandle ].image + '" class="post__author__img" title="' + author.name + '" alt="' + author.name + '"></a>';
    }

    return '';

    } ).join( '' ) + '</div>'
%>
