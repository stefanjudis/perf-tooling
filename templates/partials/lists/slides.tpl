<ui class="posts">

  <% _.each( list , function( slide ) { %>

    <li id="<%= slide.name.replace( /\s/g, '-' ) %>" class="post-slide">

      <h3 class="post-title"><a href="<%= slide.url %>" alt="Link to <%= slide.name %>" ><%= slide.name %></a></h3>
      <h4><%= slide.date %> by <%= slide.author %></h4>

      <% if ( slide.stats ) { %>

          <ul class="post-stats">

            <li>Length: <%= slide.stats.length %> Slides</li>

          </ul>

        <% } %>

      <% if ( slide.tags && slide.tags.length ) { %>

        <ul class="tags">

          <% _.each( slide.tags, function( tag ) { %>
            <li><%= tag %>
          <% } );%>

        </ul>

      <% }%>

    </li>

   <% } );%>

</ui>
