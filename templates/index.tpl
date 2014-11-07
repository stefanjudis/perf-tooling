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

        <section class="section">

          <img src="<%= cdn %>/perf-tooling.svg" alt="Link to home" class="center-block">
          <div class="text-center">

            <h1>perf-tooling.today</h1>
            <h2 class="subline">Start performance tooling today</h2>

          </div>

        </section>

        <section class="section">

          <div class="text-center">

            <h2>Automize. Monitore. Improve</h2>
            <h3 class="subline">Perf tooling is a collection of powerful tools<br>which will help you to improve your workflow and<br>to delive better and faster websites.</h3>

          </div>

          <div class="row">

            <div class="col-6">

              <h3>Tools</h3>

              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis consectetur non, ipsum ex recusandae. Aperiam possimus sapiente distinctio id, minus animi magnam! Exercitationem, inventore fugiat consequatur perspiciatis quibusdam, et perferendis.</p>

            </div>

            <div class="col-6">

              <h3>Articles</h3>

              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique illum, dolore tempora ab, eaque consectetur officia esse voluptate adipisci, quas at labore facere. Possimus architecto, ducimus in laborum iusto quaerat.</p>

            </div>

          </div>

          <div class="row">

            <div class="col-6">

              <h3>Videos</h3>

              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis consectetur non, ipsum ex recusandae. Aperiam possimus sapiente distinctio id, minus animi magnam! Exercitationem, inventore fugiat consequatur perspiciatis quibusdam, et perferendis.</p>

            </div>

            <div class="col-6">

              <h3>Slides</h3>

              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique illum, dolore tempora ab, eaque consectetur officia esse voluptate adipisci, quas at labore facere. Possimus architecto, ducimus in laborum iusto quaerat.</p>

            </div>

          </div>

          <div class="text-center">

            <a href="#" class="btn btn-primary">Explore Tools</a>

          </div>

        </section>

        <section class="section">

          <h2>Contribution</h2>

          <p>You want to add a tool? Great!<br>
          Either create an issue and we'll add itto perf-tooling.today.</p>
          <p>Or propose a pull request and add a tool by adding a JSON file at tools/automatization or tools/monitoring. The JSON files in these to folders will be automatically rendered using a template based in templates/index.tpl</p>
          <p><em>By proposing a pull request you will be added to the footer contributors list automatically</em></p>
          <p>We would like this project to become a shared resource maintained be the community, so if you have any ideas on how to improve it or make it better, please let us know an file an issue.</p>

        </section>

        <section class="section text-center">

          <h2>Build by Stefan Judis<br>& Marco Biedermann</h2>
          <p>…with a little help from our friends</p>
          <h4 class="subline">Sponsored by</h4>
          <p><a href="https://www.fastly.com/"><img src="<%= cdn %>/fastly.svg" alt="Logo of CDN Fastly"></a></p>

        </section>

        <div class="buildBy">

          <p>Brought to you by the performance community</p>
          <p><a href="https://twitter.com/search?q=%23perfmatters&src=typd" class="hashTag">#perfmatters</a></p>
          <p>Icons by <a href="http://thenounproject.com/" class="noun">The Noun Project</a></p>
          <p>Built by Stefan Judis...</p>
          <% if( contributors ) { %>
            <div id="contributors" class="contributors">
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

