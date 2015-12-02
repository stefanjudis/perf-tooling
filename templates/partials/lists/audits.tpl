<ul class="posts">
  <% list = _.sortBy( list, function( audit ) { return audit.publishedAt; } ).reverse();%>

  <% _.each( list , function( audit ) { %>
    <% var title = _.escape( audit.title || audit.name ); %>

    <li id="<%= audit.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' ) %>" class="post post--audit media <%= ( audit.hidden === true ) ? 'is-hidden' : '' %>">

      <% var twitterHandle = ( audit.social && audit.social.twitter ) ? audit.social.twitter.replace( '@', '' ) : false; %>

      <% if ( audit.thumbnail ) { %>

        <figure class="media__obj--left">

          <a href="<%= audit.url %>" title="Link to audit" target="_blank" data-modal data-modal-content-id="<%= audit.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' ) %>">
            <img src="<%= audit.thumbnail.url %>" width="295" height="166" alt="Preview of <%= audit.name %>">
          </a>

        </figure>

      <% } %>

      <div class="media__body">

        <h3><a href="<%= audit.url %>" class="link--text" title="Link to audit" target="_blank" data-modal data-modal-content-id="<%= audit.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' ) %>"><%= audit.title || audit.name %></a></h3>

        <% if ( twitterHandle && people[ twitterHandle ] ) { %>

          <h4><%= audit.date %> by <a href="https://twitter.com/<%= twitterHandle %>" title="Twitter profile of <%= audit.author %>" target="_blank"><%= audit.author %></a> (<%= people[ twitterHandle ].followerCount %> followers)</h4>

         <% } else { %>

          <%=
            partial(
              'templates/partials/authors/names.tpl',
              {
                entry   : audit,
                authors : audit.authors,
                people  : people
              }
            )
          %>

        <% } %>

        <p><a href="<%= audit.url %>" target="_blank">Open in new tab</a></p>

        <% if ( audit.stats ) { %>

          <ul class="post__stats">
            <% if ( audit.stats.viewCount ) { %>

              <li>
                <span class="visuallyhidden">Views:</span>
                 <svg class="icon icon--grey">
                  <use xlink:href="/icons-<%= hash.svg %>.svg#icon-view" />
                </svg><%= audit.stats.viewCount %>
              </li>

            <% } %>

            <% if ( audit.stats.likeCount ) { %>

              <li>
                <span class="visuallyhidden">Likes:</span>
                <svg class="icon icon--grey">
                  <use xlink:href="/icons-<%= hash.svg %>.svg#icon-like" />
                </svg>
                <%= audit.stats.likeCount %>
              </li>

            <% } %>

            <% if ( audit.stats.dislikeCount ) { %>
              <li>
                <span class="visuallyhidden">Dislikes:</span>
                <svg class="icon icon--grey">
                  <use xlink:href="/icons-<%= hash.svg %>.svg#icon-dislike" />
                </svg>
                <%= audit.stats.dislikeCount %>
              </li>

            <% } %>

          </ul>

        <% } %>

        <% if ( audit.tags && audit.tags.length ) { %>

          <%=
            partial(
              'templates/partials/tags.tpl',
              {
                tags : audit.tags
              }
            )
          %>

        <% }%>

      </div>

  <% } );%>

</ul>
