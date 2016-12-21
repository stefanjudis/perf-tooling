<ul class="posts">
  <%
    list = _.sortBy( list, function( course ) {
      return course.date ? + ( new Date( course.date ) ) : -1;
    } ).reverse();
  %>
  <% list.forEach( course => { %>

    <li id="<%= course.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' ) %>" class="post post--course media <%= ( course.hidden === true ) ? 'is-hidden' : '' %>">

      <figure class="media__obj--left">

        <a href="<%= course.url %>" title="Link to course" target="_blank">
          <picture>
            <source type="image/webp" srcset="<%= cdn %>/courses/<%= course.img.src.filename %>.<%= course.img.src.types[1] %>">
            <img src="<%= cdn %>/courses/<%= course.img.src.filename %>.<%= course.img.src.types[0] %>" width="<%= course.img.width %>" height="<%= course.img.height %>" alt="Preview <%= course.name %> ">
          </picture>
        </a>

      </figure>

      <div class="media__body">

        <h3><a href="<%= course.url %>" class="link--text" title="Link to course" target="_blank"><%= course.name %><% if ( course.isPaid ) { %> <small>(Paid)</small><% } %></a></h3>

        <%=
          partial(
            'templates/partials/authors/names.tpl',
            {
              entry   : course,
              authors : course.authors,
              people  : people
            }
          )
        %>

        <% if ( course.stats ) { %>

          <ul class="post__stats">

            <li>Length: <%= course.stats.estimatedTime %></li>
            <li>Level: <%= course.stats.level %></li>

          </ul>

        <% } %>

        <% if ( course.tags && course.tags.length ) { %>

          <%=
            partial(
              'templates/partials/tags.tpl',
              {
                tags : course.tags
              }
            )
          %>

        <% }%>

      </div>

    </li>

   <% } );%>

</ul>
