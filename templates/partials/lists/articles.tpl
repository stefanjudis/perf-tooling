<ui class="posts">
  <%
    var orderedList = _.sortBy( list, function( article ) {
      return article.date || -1;
    } ).reverse();
  %>
  <% _.each( orderedList , function( article ) { %>

    <li id="<%= article.name.toLowerCase().replace( /[\s\.:"#\(\)|]/g, '-' ) %>" class="post-article media <%= ( article.hidden === true ) ? 'is-hidden' : '' %>">

      <% var twitterHandle = ( article.social && article.social.twitter ) ? article.social.twitter.replace( '@', '' ) : false; %>

      <% if ( twitterHandle && people[ twitterHandle ] ) { %>

      <div class="media-obj-left">

        <img src="<%= people[ twitterHandle ].image %>" title="Image of <%= article.author %>" class="post-author-img">

      </div>

      <% } %>

      <div class="media-body">

        <h3 class="post-title"><a href="<%= article.url %>" alt="Link to <%= article.name %>" title="Link to article" target="_blank"><%= article.name %></a></h3>

        <% if ( twitterHandle && people[ twitterHandle ] ) { %>

          <h4><%= article.date %> by <a href="https://twitter.com/<%= twitterHandle %>" title="Twitter profile of <%= article.author %>"><%= article.author %></a> (<%= people[ twitterHandle ].followerCount %> followers)</h4>

        <% } else { %>

          <h4><%= article.date %> by <%= article.author %></h4>

        <% } %>

        <% if ( article.stats ) { %>

            <ul class="post-stats">

              <li>Length: <%= article.stats.length %> Words</li>

            </ul>

          <% } %>

        <% if ( article.tags && article.tags.length ) { %>

          <%=
            partial(
              'templates/partials/tags.tpl',
              {
                tags : article.tags
              }
            )
          %>

        <% }%>

      </div>

    </li>

   <% } );%>

</ui>
