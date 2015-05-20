<ul class="posts">

  <% _.each( list , function( tool ) { %>

    <li id="<%= tool.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' ) %>" class="post-tool <%= ( tool.hidden === true ) ? 'is-hidden' : '' %>">

      <h3><%= tool.name %></h3>

      <article class="article"><%= tool.description %></article>

      <ul class="resources">

        <% _.each( platforms , function( platform ) { %>

          <% if ( tool[ platform.name ] ) { %>

            <li class="tooltip" title="<%= platform.description %>">

              <a href="<%= tool[ platform.name ] %>" title="Link to <%= platform.description %>" class="resource-<%= platform.name %>" target="_blank">
                <svg>
                  <use xlink:href="/icons-<%= hash.svg %>.svg#icon-<%= platform.name %>" />
                </svg>
                <%= platform.description %>
              </a>

              <span><%= ( tool.stars && tool.stars[ platform.name ] ) ? tool.stars[ platform.name ] : 'N/A' %></span>

            </li>

          <% } %>

        <% } );%>
      </ul>

      <% if ( tool.tags && tool.tags.length ) { %>

        <%=
          partial(
            'templates/partials/tags.tpl',
            {
              tags : tool.tags
            }
          )
        %>

      <% }%>

    </li>

  <% } );%>

</ul>
