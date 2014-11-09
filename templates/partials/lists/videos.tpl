<ul class="posts">

  <% _.each( list , function( video ) { %>

    <li id="<%= video.name.replace( ' ', '-' ) %>" class="post-video media">

      <% if ( video.meta ) { %>

        <figure class="media-obj left">

          <a href="https://www.youtube.com/watch?v=<%= video.youtubeId %>"><img src="<%= video.meta.thumbnails.medium.url %>" width="<%= video.meta.thumbnails.medium.width %>" height="<%= video.meta.thumbnails.medium.height %>"></a>

        </figure>

      <% } %>

      <div class="media-body">

        <h3><a href="https://www.youtube.com/watch?v=<%= video.youtubeId %>"><%= ( video.meta ) ? video.meta.title : video.name %></a></h3>


        <% if ( video.stats ) { %>

          <ul class="post-stats">

            <li>
              <span class="visuallyhidden">Views:</span>
               <svg>
                <use xlink:href="#icon-view" />
              </svg><%= video.stats.viewCount %>
            </li>

            <li>
              <span class="visuallyhidden">Likes:</span>
              <svg>
                <use xlink:href="#icon-like" />
              </svg>
              <%= video.stats.likeCount %>
            </li>

            <li>
              <span class="visuallyhidden">Dislikes:</span>
              <svg>
                <use xlink:href="#icon-dislike" />
              </svg>
              <%= video.stats.dislikeCount %>
            </li>

          </ul>

        <% } %>

        <% if ( video.tags && video.tags.length ) { %>

          <ul class="tags">

            <% _.each( video.tags, function( tag ) { %>
              <li><%= tag %>
            <% } );%>

          </ul>

        <% }%>

      </div>

  <% } );%>

</ul>
