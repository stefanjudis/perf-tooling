<!DOCTYPE html>
<html lang="en">
  <%=
    partial(
      'templates/partials/head.tpl',
      {
        cdn  : cdn,
        css  : css,
        site : site,
        svg  : svg
      }
    )
  %>

  <body>

      <div class="svgIcons"><%= svg %></div>

      <div id="modal" class="modal" data-modal-close>
        <div class="modal-loading"><span class="visuallyhidden">Loading the content</span></div>
        <div class="modal-container">
          <div class="modal-inner">
            <button class="modal-close" data-modal-close>
              <svg>
                <use xlink:href="#icon-close" />
              </svg>
            </button>
            <div id="modalContent" class="modal-content"></div>
          </div>
        </div>
      </div>

      <%=
        partial(
          'templates/partials/header.tpl',
          {
            active           : type,
            cdn              : cdn,
            site             : site
          }
        )
      %>

      <main class="main" role="main">

        <div class="container">


          <%=
            partial(
              'templates/partials/fuzzy.tpl',
              {
                list      : list,
                platforms : platforms,
                query     : query,
                type      : type,
                tags      : _.reduce( list, function( tags, entry ) {
                  if ( entry.tags && entry.tags.length ) {
                    for ( var i = 0; i < entry.tags.length; ++i ) {
                      if ( _.indexOf( tags, entry.tags[ i ] ) === -1 ) {
                        tags.push( entry.tags[ i ] );
                      }
                    }
                  }

                  return tags;
                }, [] ).sort()
              }
            )
          %>

          <% if ( debug ) { %>
            <pre><code><%= JSON.stringify( list, null, 2 ) %></code></pre>
            <pre><code><%= JSON.stringify( people, null, 2 ) %></code></pre>
          <% } %>

          <%=
            partial(
              'templates/partials/lists/' + type + '.tpl',
              {
                list    : list,
                partial : partial,
                people  : people,
                cdn     : cdn
              }
            )
          %>
          <div id="noResultMsg" class="<%= ( _.filter( list, function( entry ) { return !entry.hidden; } ).length ) ? 'is-hidden' : '' %>">No results found</div>

        </div>

      </main>

      <%=
        partial(
          'templates/partials/footer.tpl',
          {}
        )
      %>

    <script>
      window.list = <%= JSON.stringify(
        _.map( list, function( entry ) {
          return {
            fuzzy : entry.fuzzy,
            id    : entry.id,
            html  : entry.html
          }
        } )
      ) %>;
    </script>
    <script src="<%= cdn %>/tooling.js?<%= hash.js %>" async></script>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-53831300-1', 'auto');
      ga('send', 'pageview');
    </script>

  </body>

</html>

