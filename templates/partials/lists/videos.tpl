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

            <li>Views: <%= video.stats.viewCount %>
            <li>Likes: <%= video.stats.likeCount %>
            <li>Dislikes: <%= video.stats.dislikeCount %>

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
