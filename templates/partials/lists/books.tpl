<ul class="posts">
  <% list = _.sortBy( list, function( book ) { return book.date; } ).reverse(); %>

  <% _.each( list , function( book ) { %>

    <li id="<%= book.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' ) %>" class="post-book media <%= ( book.hidden === true ) ? 'is-hidden' : '' %>">

      <figure class="media-obj-left">

        <a href="<%= book.url %>" title="Link to video" target="_blank"><img src="<%= cdn %>/books/<%= book.img.src %>" width="<%= book.img.width %>" height="<%= book.img.height %>" alt="<%= book.name %> "></a>

      </figure>

      <div class="media-body">

        <h3 class="post-title"><a href="<%= book.url %>" title="Link to video" target="_blank"><%= book.name %></a></h3>

        <%=
          partial(
            'templates/partials/authors/names.tpl',
            {
              entry   : book,
              authors : book.authors,
              people  : people
            }
          )
        %>

        <p><%= book.description %></p>

        <% if ( book.tags && book.tags.length ) { %>

          <%=
            partial(
              'templates/partials/tags.tpl',
              {
                tags : book.tags
              }
            )
          %>

        <% }%>

      </div>

  <% } );%>

</ul>
