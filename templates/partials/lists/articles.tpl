<ul class="posts">
  <%
    list = _.sortBy( list, function( article ) {
      return article.date || -1;
    } ).reverse();
  %>
  <% _.each( list , function( article ) { %>

    <li id="<%= article.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' ) %>" class="post--article <%= ( article.hidden === true ) ? 'is-hidden' : '' %>">

      <%=
        partial(
          'templates/partials/authors/images.tpl',
          {
            authors : article.authors,
            people  : people
          }
        )
      %>

      <div class="post__content">

        <h3 class="post__title"><a href="<%= article.url %>" alt="Link to <%= article.name %>" title="Link to article" target="_blank"><%= article.name %></a></h3>

        <%=
          partial(
            'templates/partials/authors/names.tpl',
            {
              entry   : article,
              authors : article.authors,
              people  : people
            }
          )
        %>

        <% if ( article.stats ) { %>

          <ul class="post__stats">

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

</ul>
