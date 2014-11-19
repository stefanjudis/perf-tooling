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

      <main class="main">

        <div class="container">

          <section class="section section-intro">

            <img src="<%= cdn %>/perf-tooling.svg" alt="perf-tooling logo" width="546" height="370" class="center-block">

            <div class="text-center">

              <h1>perf-tooling.today</h1>
              <h2 class="subline">Start performance tooling today</h2>

              <a class="btn btn-scroll js-scroll" href="#features" title="Scroll to features">
                <span class="visuallyhidden">Scroll to features</span><svg>
                  <use xlink:href="#icon-arrow" />
                </svg>
              </a>

            </div>

          </section>

          <section class="section">

            <div class="text-center">

              <h2>Automize. Monitore. Improve</h2>
              <h3 class="subline">Perf tooling is a collection of powerful resources which will help you to improve your workflow and to delive better and faster websites.</h3>

            </div>

          </section>

          <section id="features" class="section">

            <div class="row">

              <div class="col-6">

                <article class="article">

                  <h3><%= resourceCount.tools %> Tools</h3>

                  <p>A rich collection of tools available to optimize and/or monitor your website's performance including bookmarklets, browser extensions, command line tools, node modules and grunt/gulp tasks.</p>

                </article>

              </div>

              <div class="col-6">

                <article class="article">

                  <h3><%= resourceCount.articles %> Articles</h3>

                  <p>An exclusive list of articles that inform about best practices to build fast websites and to make your visitors happy.</p>

                </article>

              </div>

            </div>

            <div class="row">

              <div class="col-6">

                <article class="article">

                  <h3><%= resourceCount.videos %> Videos</h3>

                  <p>An exclusive collection of recent videos including performance specific tipps and tricks to build better and faster websites.</p>

                </article>

              </div>

              <div class="col-6">

                <article class="article">

                  <h3><%= resourceCount.slides %> Slides</h3>

                  <p>An exclusive collection of slides of great talks covering performance related topics.</p>

                </article>

              </div>

            </div>

            <div class="text-center">

              <a href="/tools" title="Link to tools" class="btn btn-large btn-primary">Explore Tools</a>

            </div>

          </section>

          <section class="section">

            <article class="article">

              <h2>Contribution</h2>

              <p>You want to add a tool? Great!<br>
              Either <a href="https://github.com/stefanjudis/perf-tooling/issues" title="Link to repo issues" target="_blank">create an issue</a> and we'll add it to perf-tooling.today.</p>
              <p>Or propose a pull request and add a tool by adding a new JSON file to the <a href="https://github.com/stefanjudis/perf-tooling/tree/master/data" title="Link to data folder" target="_blank">data folder</a>. The JSON files in these folders will be automatically rendered using a template based in the <a href="https://github.com/stefanjudis/perf-tooling/tree/master/templates" title="Link to templates folder" target="_blank">templates folder</a>. For more detailed information check the <a href="https://github.com/stefanjudis/perf-tooling/blob/master/CONTRIBUTING.md" title="Link to contributing readme" target="_blank">CONTRIBUTING.md</a>.</p>
              <p><em>By proposing a pull request you will be added to the footer contributors list automatically.</em></p>
              <p>We would like this project to become a shared resource maintained be the community, so if you have any ideas on how to improve it or make it better, please let us know and <a href="https://github.com/stefanjudis/perf-tooling/issues" title="Link to repo issues" target="_blank">file an issue on Github.</a></p>

            </article>

            <div class="text-center">

              <a href="https://github.com/stefanjudis/perf-tooling/issues" class="btn btn-large btn-primary" title="Link to repo issues" target="_blank">File an issue</a>

            </div>

          </section>

          <section class="section buildBy text-center">

            <h3>Built by Stefan Judis<br>& Marco Biedermann</h3>

            <ul class="buildBy-socialList">

              <li>
                <a href="https://twitter.com/stefanjudis" title="Link to Stefan on Twitter" target="_blank">
                  <span class="visuallyhidden">Stefan on Twitter</span>
                  <svg>
                    <use xlink:href="#icon-twitter" />
                  </svg>
                </a>
              </li>

              <li>
                <a href="https://github.com/stefanjudis" title="Link to Stefan on GitHub" target="_blank">
                  <span class="visuallyhidden">Stefan on Github</span>
                  <svg>
                    <use xlink:href="#icon-github" />
                  </svg>
                </a>
              </li>

              <li>
                <a href="mailto:stefanjudis@gmail.com" title="Send Stafan an email" target="_blank">
                  <span class="visuallyhidden">Stefan's email address</span>
                  <svg>
                    <use xlink:href="#icon-email" />
                  </svg>
                </a>
              </li>

            </ul>
            <ul class="buildBy-socialList">

              <li>
                <a href="https://github.com/marcobiedermann" title="Link to Marco on GitHub" target="_blank">
                  <span class="visuallyhidden">Marco on Github</span>
                  <svg>
                    <use xlink:href="#icon-github" />
                  </svg>
                </a>
              </li>

              <li>
                <a href="https://twitter.com/m412c0b" title="Link to Marco on Twitter" target="_blank">
                  <span class="visuallyhidden">Marco on Twitter</span>
                  <svg>
                    <use xlink:href="#icon-twitter" />
                  </svg>
                </a>
              </li>

            </ul>

          </section>

            <% if( contributors ) { %>

              <section class="section text-center">

                <div id="contributors" class="contributors">

                  <p>...with a little help from our friends</p>

                  <ul class="list-unstyled">

                    <% _.each( contributors, function( contrib ) { %>
                      <% if ( contrib.login !== 'stefanjudis' && contrib.login !== 'marcobiedermann' ) { %>
                        <li class="contributor"><a href="<%= contrib.url.replace( 'api.','' ).replace( 'users/','' ) %>" data-url="<%= contrib.avatar_url + '&s=40' %>" data-login="<%= contrib.login %>" target="_blank"></a></li>
                      <% } %>
                    <% } ) %>

                  </ul>

                </div>

              </section>

            <% } %>

          </section>

          <section class="section sponsor text-center">

            <h4 class="subline">Sponsored by</h4>
            <p><a href="https://www.fastly.com/" title="Link to Fastly CDN" target="_blank"><img src="<%= cdn %>/fastly_grey.svg" alt="Logo of CDN Fastly" width="160" height="72"></a></p>

          </section>

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

