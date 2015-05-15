<!DOCTYPE html>
<html lang="en">
  <%=
    partial(
      'templates/partials/head.tpl',
      {
        cdn       : cdn,
        css       : css,
        cssCookie : cssCookie,
        site      : site,
        enhance   : enhance,
        hash      : hash
      }
    )
  %>

  <body>

      <%=
        partial(
          'templates/partials/header.tpl',
          {
            active           : type,
            cdn              : cdn,
            hash             : hash,
            site             : site
          }
        )
      %>

      <main class="site__main" role="main">

        <div class="grid__container">


          <%=
            partial(
              'templates/partials/fuzzy.tpl',
              {
                cdn       : cdn,
                hash      : hash,
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
                cdn     : cdn,
                hash    : hash,
                list    : list,
                partial : partial,
                people  : people
              }
            )
          %>
          <div id="noResultMsg" class="<%= ( _.filter( list, function( entry ) { return !entry.hidden; } ).length ) ? 'is-hidden' : '' %>">No results found</div>

        </div>

      </main>

      <%=
        partial(
          'templates/partials/footer.tpl',
          {
            cdn              : cdn,
            hash             : hash
          }
        )
      %>

    <script>
      window.list = <%= JSON.stringify(
        _.map( list, function( entry ) {
          return {
            fuzzy : entry.fuzzy,
            name  : entry.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' )
          }
        } )
      ) %>;

      window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;
        ga('create','UA-53831300-1','auto');ga('send','pageview')
    </script>
    <script src="<%= cdn %>/tooling-<%= hash.js %>.js" async></script>
    <script src="https://www.google-analytics.com/analytics.js" async defer></script>

  </body>

</html>

