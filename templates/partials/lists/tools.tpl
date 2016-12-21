<ul class="posts">

  <% list.forEach( tool => {

    function isPaid( toolObject ) {
        return !! _.findKey( toolObject, 'isPaid', true );
    }

    %>

    <li id="<%= tool.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' ) %>" class="post post--tool <%= ( tool.hidden === true ) ? 'is-hidden' : '' %>">

      <h3><%= tool.name %><% if ( isPaid( tool ) ) { %> <small>(Paid)</small><% } %></h3>

      <article class="article"><%= tool.description %></article>

      <ul class="resources">

        <% platforms.forEach( platform => { %>

          <% if ( tool[ platform.name ] ) { %>

            <li class="resource--<%= platform.name %>">

              <a href="<%= tool[ platform.name ].url %>" title="Link to <%= platform.description %>" target="_blank">
                <svg class="icon">
                  <use xlink:href="/icons-<%= hash.svg %>.svg#<%= platform.name %>" />
                </svg>
                <span class="tooltip"><% if ( tool[ platform.name ].isPaid ) { %>Paid <% } %><%= platform.description %></span>
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
