<ul class="posts">
  <%
    list = _.sortBy( list, function( article ) {
      return article.date || -1;
    } ).reverse();
  %>
  <% _.each( list , function( slide ) { %>

    <li id="<%= slide.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' ) %>" class="post post--slide <%= ( slide.hidden === true ) ? 'is-hidden' : '' %>">

      <% var twitterHandle = ( slide.social && slide.social.twitter ) ? slide.social.twitter.replace( '@', '' ) : false; %>

      <% if ( slide.thumbnail ) { %>

        <figure class="media__obj--left">

          <a href="<%= slide.url %>" title="Link to slide" target="_blank"><img src="<%= slide.thumbnail.url %>" width="170" height="128"></a>

        </figure>

      <% } %>

      <div class="media__body">

        <h3><a href="<%= slide.url %>" class="link--text" alt="Link to <%= slide.name %>" title="Link to slide" target="_blank"><%= slide.name %></a></h3>

        <% if ( twitterHandle && people[ twitterHandle ] ) { %>

          <h4><%= slide.date %> by <a href="https://twitter.com/<%= twitterHandle %>" title="Twitter profile of <%= slide.author %>" target="_blank"><%= slide.author %></a> (<%= people[ twitterHandle ].followerCount %> followers)</h4>

         <% } else { %>

          <%=
            partial(
              'templates/partials/authors/names.tpl',
              {
                entry   : slide,
                authors : slide.authors,
                people  : people
              }
            )
          %>

        <% } %>

        <% if ( slide.stats ) { %>

          <ul class="post__stats">

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

</ul>
