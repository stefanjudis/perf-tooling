<ul class="posts">

  <% _.each( list , function( tool ) { %>

    <li id="<%= tool.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' ) %>" class="post post--tool <%= ( tool.hidden === true ) ? 'is-hidden' : '' %>">

      <h3><%= tool.name %></h3>

      <article class="article"><%= tool.description %></article>

      <ul class="resources">

        <% _.each( platforms , function( platform ) { %>

          <% if ( tool[ platform.name ] ) { %>

            <li class="resource--<%= platform.name %>">

              <a href="<%= tool[ platform.name ] %>" title="Link to <%= platform.description %>" target="_blank">
                <svg class="icon">
                  <use xlink:href="<%= cdn %>/icons-<%= hash.svg %>.svg#icon-<%= platform.name %>" />
                </svg>
                <span class="tooltip"><%= platform.description %></span>
                <span class="stars"><%= ( tool.stars && tool.stars[ platform.name ] ) ? tool.stars[ platform.name ] + '☆' : 'N/A' %></span>
              </a>

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
