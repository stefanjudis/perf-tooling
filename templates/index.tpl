<!DOCTYPE html>
<html lang="en">
  <%=
    partial(
      'templates/partials/head.tpl',
      {
        css  : css,
        site : site,
        svg  : svg
      }
    )
  %>
  <body>
      <%=
        partial(
          'templates/partials/header.tpl',
          {
            active : type,
            cdn    : cdn,
            site   : site
          }
        )
      %>
      <main class="container">
        <img src="<%= cdn %>/perf-tooling.svg" alt="Link to home">
        <h1>perf-tooling.today</h1>
        <h2>Start performance tooling today</h2>
        <div class="buildBy">
          <p>Brought to you by the performance community</p>
          <p><a href="https://twitter.com/search?q=%23perfmatters&src=typd" class="hashTag">#perfmatters</a></p>
          <p>Icons by <a href="http://thenounproject.com/" class="noun">The Noun Project</a></p>
          <p>Built by Stefan Judis...</p>
          <% if( contributors ) { %>
            <div id="contributors">
              <p>...with a little help from our friends</p>
              <ul>
                <% _.each( contributors, function( contrib ) { %>
                  <% if ( contrib.login !== 'stefanjudis' && contrib.login !== 'marcobiedermann' ) { %>
                    <li class="contributor"><a href="<%= contrib.url.replace( 'api.','' ).replace( 'users/','' ) %>" data-url="<%= contrib.avatar_url + '&s=42' %>" data-login="<%= contrib.login %>"></a></li>
                  <% } %>
                <% } ) %>
              </ul>
            </div>
          <% } %>
          <div class="sponsor">
            Sponsored by
            <a href="https://www.fastly.com/"><img src="<%= cdn %>/fastly.svg" alt="Logo of CDN Fastly"></a>
          </div>
        </div>
      </main>
      <%=
        partial(
          'templates/partials/footer.tpl',
          {}
        )
      %>
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

