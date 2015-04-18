<ul class="posts">
  <%
    list = _.sortBy( list, function( article ) {
      return article.date || -1;
    } ).reverse();
  %>
  <% _.each( list , function( slide ) { %>
    <% var title = _.escape( slide.name ); %>

    <li id="<%= slide.id %>" class="post-slide <%= ( slide.hidden === true ) ? 'is-hidden' : '' %>">

      <% var twitterHandle = ( slide.social && slide.social.twitter ) ? slide.social.twitter.replace( '@', '' ) : false; %>

      <% if ( slide.thumbnail ) { %>

        <figure class="media-obj-left">

          <a href="<%= slide.url %>" title="Preview of <%= title %>" target="_blank" data-modal data-modal-content-id="<%= slide.id %>"><img src="<%= slide.thumbnail.url %>" width="<%= slide.thumbnail.width %>" height="<%= slide.thumbnail.height %>"></a>

        </figure>

      <% } %>

      <div class="media-body">

        <h3 class="post-title"><a href="<%= slide.url %>" title="Preview of <%= title %>" data-modal data-modal-content-id="<%= slide.id %>" target="_blank"><%= slide.name %></a></h3>

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

        <p><a href="<%= slide.url %>" target="_blank">Open in new tab</a></p>

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

</ul>
