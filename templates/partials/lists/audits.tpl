<ul class="posts posts--flex">
  <%
    list = _.sortBy( list, function( audit ) {
      return audit.date ? + ( new Date( audit.date ) ) : -1;
    } ).reverse();
  %>

  <% _.each( list , function( audit ) { %>
    <% var title = _.escape( audit.title || audit.name ); %>

    <li id="<%= audit.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' ) %>" class="post post--audit media <%= ( audit.hidden === true ) ? 'is-hidden' : '' %>">

      <% var twitterHandle = ( audit.social && audit.social.twitter ) ? audit.social.twitter.replace( '@', '' ) : false; %>

      <div class="media__body">

        <h3><a href="<%= audit.url %>" class="link--text" title="Link to audit" target="_blank"><%= audit.title || audit.name %></a></h3>

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

        <% if ( audit.types ) { %>
          <ul class="post__stats">
            <% _.each( audit.types, function( type ) { %>
              <li>
                <svg class="icon icon--grey">
                  <use xlink:href="/icons-<%= hash.svg %>.svg#icon-<%= type %>" />
                </svg>
                <%= type %>
            <% } ) %>
          </ul>
        <% } %>

        <% if ( audit.targets ) { %>
          <dl class="post__targets">
            <dt>Audit for:</dt>
            <% var regex = /(http(s)?\:\/\/)?((\w*?\.)?\w*\.\w+)/; %>
            <% _.each( audit.targets, function( target ) { %>
              <dd><a href="<%= target %>" target="_blank"><%= regex.exec( target )[ 3 ] %></a></dd>
            <% } ) %>
          </dl>
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
