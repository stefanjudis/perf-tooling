<ui class="posts">
  <%
    var orderedList = _.sortBy( list, function( article ) {
      return article.date || -1;
    } ).reverse();
  %>
  <% _.each( orderedList , function( slide ) { %>

    <li id="<%= slide.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' ) %>" class="post-slide <%= ( slide.hidden === true ) ? 'is-hidden' : '' %>">

      <% var twitterHandle = ( slide.social && slide.social.twitter ) ? slide.social.twitter.replace( '@', '' ) : false; %>

      <% if ( twitterHandle && people[ twitterHandle ] ) { %>

        <a href="https://twitter.com/<%= twitterHandle %>" title="Twitter profile of <%= slide.author %>" target="_blank"><img src="<%= people[ twitterHandle ].image %>" title="Image of <%= slide.author %>" class="post-author-img"></a>

      <% } %>

      <div class="post-content">

        <h3 class="post-title"><a href="<%= slide.url %>" alt="Link to <%= slide.name %>" title="Link to slide" target="_blank"><%= slide.name %></a></h3>

        <% if ( twitterHandle && people[ twitterHandle ] ) { %>

          <h4><%= slide.date %> by <a href="https://twitter.com/<%= twitterHandle %>" title="Twitter profile of <%= slide.author %>" target="_blank"><%= slide.author %></a> (<%= people[ twitterHandle ].followerCount %> followers)</h4>

        <% } else { %>

          <h4><%= slide.date %> by <%= slide.author %></h4>

        <% } %>

        <% if ( slide.stats ) { %>

            <ul class="post-stats">

              <li>Length: <%= slide.stats.length %> Slides</li>

            </ul>

          <% } %>

        <% if ( slide.tags && slide.tags.length ) { %>

          <%=
            partial(
              'templates/partials/tags.tpl',
              {
                tags : slide.tags
              }
            )
          %>

        <% }%>

      </div>

    </li>

   <% } );%>

</ui>
