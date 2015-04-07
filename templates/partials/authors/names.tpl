<%=
  '<h4>' + ( ( entry.date ) ? entry.date : '' ) + ' by ' + _.map( authors, function( author ) {

    var twitterHandle = ( author.twitter ) ? author.twitter.replace( '@', '' ) : false;

    if ( twitterHandle && people[ twitterHandle ] && people[ twitterHandle ].followerCount ) {

      return '<a href="https://twitter.com/' + twitterHandle +'" title="Twitter profile of ' + author.name + '" target="_blank">' +  author.name + '</a> (' + people[ twitterHandle ].followerCount + ' followers)';

    } else {

      return author.name;

    }

  } ).join( ' | ' ) + '</h4>'
%>
