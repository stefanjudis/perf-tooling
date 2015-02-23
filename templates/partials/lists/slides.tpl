<ul class="posts">
  <%
    list = _.sortBy( list, function( article ) {
      return article.date || -1;
    } ).reverse();
  %>
  <% _.each( list , function( slide ) { %>

    <li id="<%= slide.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' ) %>" class="post-slide <%= ( slide.hidden === true ) ? 'is-hidden' : '' %>">

      <%=
        partial(
          'templates/partials/authors/images.tpl',
          {
            authors : slide.authors,
            people  : people
          }
        )
      %>

      <div class="post-content">

        <h3 class="post-title"><a href="<%= slide.url %>" alt="Link to <%= slide.name %>" title="Link to slide" target="_blank"><%= slide.name %></a></h3>

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
