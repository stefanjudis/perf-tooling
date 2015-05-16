<ul class="posts">

  <% _.each( list , function( tool ) { %>

    <li id="<%= tool.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' ) %>" class="post-tool <%= ( tool.hidden === true ) ? 'is-hidden' : '' %>">

      <h3><%= tool.name %></h3>

      <article class="article"><%= tool.description %></article>

      <ul class="resources">

        <li class="tooltip" title="tool.description">

          <a href="<%= tool.name %>" title="Link to <%= tool.description %>" class="resource-<%= tool.name %>" target="_blank">
            <svg>
              <use xlink:href="/icons-<%= hash.svg %>.svg#icon-<%= tool.name %>" />
            </svg>
            <%= tool.description %>
          </a>

          <span><%= ( tool.stars && tool.stars.bookmarklet ) ? tool.stars.bookmarklet : 'N/A' %></span>

        </li>

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
