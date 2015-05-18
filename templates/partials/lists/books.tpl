<ul class="posts">
  <% list = _.sortBy( list, function( book ) { return book.date; } ).reverse(); %>

  <% _.each( list , function( book ) { %>

    <li id="<%= book.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' ) %>" class="post post--book media <%= ( book.hidden === true ) ? 'is-hidden' : '' %>">

      <figure class="media__obj--left">

        <a href="<%= book.url %>" title="Link to video" target="_blank">
          <picture>
            <source type="image/webp" srcset="<%= cdn %>/books/<%= book.img.src.filename %>.<%= book.img.src.types[1] %>">
            <img src="<%= cdn %>/books/<%= book.img.src.filename %>.<%= book.img.src.types[0] %>" width="<%= book.img.width %>" height="<%= book.img.height %>" alt="<%= book.name %> ">
          </picture>
        </a>

      </figure>

      <div class="media__body">

        <h3><a href="<%= book.url %>" class="link--text" title="Link to video" target="_blank"><%= book.name %></a></h3>

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
