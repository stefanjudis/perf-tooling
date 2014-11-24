<ul class="posts">
  <% list = _.sortBy( list, function( video ) { return video.publishedAt; } ).reverse();%>

  <% _.each( list , function( video ) { %>

    <li id="<%= video.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' ) %>" class="post-video media <%= ( video.hidden === true ) ? 'is-hidden' : '' %>">

      <% if ( video.thumbnail ) { %>

        <figure class="media-obj-left">

          <a href="<%= video.url %>" title="Link to video" target="_blank"><img src="<%= video.thumbnail.url %>" width="<%= video.thumbnail.width %>" height="<%= video.thumbnail.height %>"></a>

        </figure>

      <% } %>

      <div class="media-body">

        <h3 class="post-title"><a href="<%= video.url %>" title="Link to video" target="_blank"><%= video.title || video.name %></a></h3>


        <% if ( video.stats ) { %>

          <ul class="post-stats">
            <% if ( video.stats.viewCount ) { %>

              <li>
                <span class="visuallyhidden">Views:</span>
                 <svg>
                  <use xlink:href="#icon-view" />
                </svg><%= video.stats.viewCount %>
              </li>

            <% } %>

            <% if ( video.stats.likeCount ) { %>

              <li>
                <span class="visuallyhidden">Likes:</span>
                <svg>
                  <use xlink:href="#icon-like" />
                </svg>
                <%= video.stats.likeCount %>
              </li>

            <% } %>

            <% if ( video.stats.dislikeCount ) { %>
              <li>
                <span class="visuallyhidden">Dislikes:</span>
                <svg>
                  <use xlink:href="#icon-dislike" />
                </svg>
                <%= video.stats.dislikeCount %>
              </li>

            <% } %>

          </ul>

        <% } %>

        <% if ( video.tags && video.tags.length ) { %>

          <%=
            partial(
              'templates/partials/tags.tpl',
              {
                tags : video.tags
              }
            )
          %>

        <% }%>

      </div>

  <% } );%>

</ul>
