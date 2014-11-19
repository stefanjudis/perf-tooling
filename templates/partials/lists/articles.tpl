<ui class="posts">

  <% _.each( list , function( article ) { %>

    <li id="<%= article.name.toLowerCase().replace( /[\s\.:"#\(\)|]/g, '-' ) %>" class="post-article <%= ( article.hidden === true ) ? 'is-hidden' : '' %>">

      <h3 class="post-title"><a href="<%= article.url %>" alt="Link to <%= article.name %>" title="Link to article" target="_blank"><%= article.name %></a></h3>
      <h4><%= article.date %> by <%= article.author %></h4>

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

    </li>

   <% } );%>

</ui>
