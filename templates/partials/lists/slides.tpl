<ui class="posts">

  <% _.each( list , function( slide ) { %>

    <li id="<%= slide.name.replace( /\s/g, '-' ) %>" class="post-slide <%= ( slide.hidden === true ) ? 'is-hidden' : '' %>">

      <h3 class="post-title"><a href="<%= slide.url %>" alt="Link to <%= slide.name %>" title="Link to slide" target="_blank"><%= slide.name %></a></h3>
      <h4><%= slide.date %> by <%= slide.author %></h4>

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

    </li>

   <% } );%>

</ui>
