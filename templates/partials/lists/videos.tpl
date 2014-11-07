<ul class="posts">
  <% _.each( list , function( video ) { %>
    <li id="<%= video.name.replace( ' ', '-' ) %>">
      <h3><%= ( video.meta ) ? video.meta.title : video.name %></h3>
      <div class="posts--content"><%= ( video.meta ) ? video.meta.description : video.description %></div>

      <% if ( video.meta ) { %>
        <img src="<%= video.meta.thumbnails.medium.url %>" width="<%= video.meta.thumbnails.medium.width %>" height="<%= video.meta.thumbnails.medium.height %>">
      <% } %>

      <% if ( video.stats ) { %>
        <ul>
          <li>Views : <%= video.stats.viewCount %>
          <li>Likes : <%= video.stats.likeCount %>
          <li>Likes : <%= video.stats.dislikeCount %>
        </ul>
      <% } %>

      <% if ( video.tags && video.tags.length ) { %>
        <ul class="tags">
          <% _.each( video.tags, function( tag ) { %>
            <li><%= tag %>
          <% } );%>
        </ul>
      <% }%>
  <% } );%>
</ul>
