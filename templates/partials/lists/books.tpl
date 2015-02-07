<ul class="posts">
  <% list = _.sortBy( list, function( book ) { return book.date; } ).reverse(); %>

  <% _.each( list , function( book ) { %>

    <li id="<%= book.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' ) %>" class="post-book media <%= ( book.hidden === true ) ? 'is-hidden' : '' %>">

      <% var twitterHandle = ( book.social && book.social.twitter ) ? book.social.twitter.replace( '@', '' ) : false; %>

      <figure class="media-obj-left">

        <a href="<%= book.url %>" title="Link to video" target="_blank"><img src="<%= cdn %>/books/<%= book.img.src %>" width="<%= book.img.width %>" height="<%= book.img.height %>" alt="<%= book.name %> "></a>

      </figure>

      <div class="media-body">

        <h3 class="post-title"><a href="<%= book.url %>" title="Link to video" target="_blank"><%= book.name %></a></h3>

        <% if ( twitterHandle && people[ twitterHandle ] ) { %>

          <h4><%= book.date %> by <a href="https://twitter.com/<%= twitterHandle %>" title="Twitter profile of <%= book.author %>" target="_blank"><%= book.author %></a> (<%= people[ twitterHandle ].followerCount %> followers)</h4>

         <% } else { %>

          <h4>by <%= book.author %></h4>

        <% } %>

        <p><%= book.description %></p>

        <% if ( book.tags && book.tags.length ) { %>

          <%=
            partial(
              'templates/partials/tags.tpl',
              {
                tags : book.tags
              }
            )
          %>

        <% }%>

      </div>

  <% } );%>

</ul>
