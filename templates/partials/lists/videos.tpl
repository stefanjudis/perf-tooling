<ul class="posts">
  <% list = _.sortBy( list, function( video ) { return video.publishedAt; } ).reverse();%>

  <% _.each( list , function( video ) { %>
    <% var title = _.escape( video.title || video.name ); %>

    <li id="<%= video.id %>" class="post-video media <%= ( video.hidden === true ) ? 'is-hidden' : '' %>">

      <% var twitterHandle = ( video.social && video.social.twitter ) ? video.social.twitter.replace( '@', '' ) : false; %>

      <% if ( video.thumbnail ) { %>

        <figure class="media-obj-left">

          <a href="<%= video.url %>" title="Preview of <%= title %>" target="_blank" data-modal data-modal-content-id="<%= video.id %>"><img src="<%= video.thumbnail.url %>" width="<%= video.thumbnail.width %>" height="<%= video.thumbnail.height %>"></a>

        </figure>

      <% } %>

      <div class="media-body">

        <h3 class="post-title"><a href="#" title="Preview of <%= title %>" data-modal data-modal-content-id="<%= video.id %>"><%= title %></a></h3>

        <% if ( twitterHandle && people[ twitterHandle ] ) { %>

          <h4><%= video.date %> by <a href="https://twitter.com/<%= twitterHandle %>" title="Twitter profile of <%= video.author %>" target="_blank"><%= video.author %></a> (<%= people[ twitterHandle ].followerCount %> followers)</h4>

         <% } else { %>

          <%=
            partial(
              'templates/partials/authors/names.tpl',
              {
                entry   : video,
                authors : video.authors,
                people  : people
              }
            )
          %>

        <% } %>

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
