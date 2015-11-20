<!DOCTYPE html>
<html lang="en">

  <%=
    partial(
      'templates/partials/head.tpl',
      {
        cdn       : cdn,
        css       : css,
        site      : site,
        enhance   : enhance,
        cssCookie : cssCookie,
        hash      : hash,
        name      : name,
        type      : type
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

      <main class="site__main">

        <div class="grid__container">

          <section class="site__section site__section--intro">

            <img src="<%= cdn %>/perf-tooling.svg" alt="perf-tooling logo" width="546" height="370" class="center-block">

            <div class="text-center">

              <h1>perf-tooling.today</h1>
              <h2 class="subline">Start performance tooling today</h2>

              <a class="btn btn--scroll js-scroll" href="#features" title="Scroll to features">
                <span class="visuallyhidden">Scroll to features</span>
                <svg class="icon icon--3x icon--black">
                  <use xlink:href="/icons-<%= hash.svg %>.svg#icon-arrow" />
                </svg>
              </a>

            </div>

          </section>

          <section class="site__section">

            <div class="text-center">

              <h2>Automate. Monitor. Improve.</h2>
              <h3 class="subline">Perf-tooling is a collection of powerful resources which will help you to improve your workflow and to deliver better and faster websites.</h3>

            </div>

          </section>

          <section id="features" class="site__section">

            <div class="flexgrid__container">

              <article class="article flexgrid__item">

                <h3><%= resourceCount.tools %> Tools</h3>

                <p>A rich collection of tools available to optimize and/or monitor your website's performance including bookmarklets, browser extensions, command line tools, node modules and grunt/gulp tasks.</p>

                <div class="article__cta">

                  <a href="/tools" title="Link to tools" class="btn btn--large btn--primary">Explore Tools</a>

                </div>

              </article>

              <article class="article flexgrid__item">

                <h3><%= resourceCount.articles %> Articles</h3>

                <p>An exclusive list of articles about best practices to build fast websites which will make your visitors happy.</p>

                <div class="article__cta">

                  <a href="/articles" title="Link to articles" class="btn btn--large btn--primary">Explore Articles</a>

                </div>

              </article>

              <article class="article flexgrid__item">

                <h3><%= resourceCount.videos %> Videos</h3>

                <p>A collection of recent videos including performance-specific tips and tricks to build better and faster websites.</p>

                <div class="article__cta">

                  <a href="/videos" title="Link to videos" class="btn btn--large btn--primary">Explore Videos</a>

                </div>

              </article>

              <article class="article flexgrid__item">

                <h3><%= resourceCount.slides %> Slidedecks</h3>

                <p>A library of slides from great talks covering performance-related topics.</p>

                <div class="article__cta">

                  <a href="/slides" title="Link to slides" class="btn btn--large btn--primary">Explore Slidedecks</a>

                </div>

              </article>

              <article class="article flexgrid__item">

                <h3><%= resourceCount.books %> Books</h3>

                <p>Our books section features recommended books from some of the most influential authors in the field.</p>

                <div class="article__cta">

                  <a href="/books" title="Link to tools" class="btn btn--large btn--primary">Explore Books</a>

                </div>

              </article>

              <article class="article flexgrid__item">

                <h3><%= resourceCount.courses %> Courses</h3>

                <p>For self-learners, we include courses to get you going.</p>

                <div class="article__cta">

                  <a href="/courses" title="Link to tools" class="btn btn--large btn--primary">Explore Courses</a>

                </div>

              </article>

            </div>

          </section>

          <section class="site__section">

            <article class="article">

              <h2>Contribution</h2>

              <p>You want to add a tool? Great!<br>
              Either <a href="https://github.com/stefanjudis/perf-tooling/issues" title="Link to repo issues" target="_blank">create an issue</a> and we'll add it to perf-tooling.today.</p>
              <p>Or propose a pull request and add a tool by adding a new JSON file to the <a href="https://github.com/stefanjudis/perf-tooling/tree/master/data" title="Link to data folder" target="_blank">data folder</a>. The JSON files in these folders will be automatically rendered using a template based in the <a href="https://github.com/stefanjudis/perf-tooling/tree/master/templates" title="Link to templates folder" target="_blank">templates folder</a>. For more detailed information check the <a href="https://github.com/stefanjudis/perf-tooling/blob/master/CONTRIBUTING.md" title="Link to contributing readme" target="_blank">CONTRIBUTING.md</a>.</p>
              <p><em>By proposing a pull request you will be added to the footer contributors list automatically.</em></p>
              <p>We would like this project to become a shared resource maintained by the community, so if you have any ideas on how to improve it or make it better, please let us know and <a href="https://github.com/stefanjudis/perf-tooling/issues" title="Link to repo issues" target="_blank">file an issue on Github.</a></p>

            </article>

            <div class="text-center">

              <a href="https://github.com/stefanjudis/perf-tooling/issues" class="btn btn--primary" title="Link to repo issues" target="_blank">Submit a resource</a>
              <a href="https://github.com/stefanjudis/perf-tooling/blob/master/CONTRIBUTING.md" class="btn btn--primary" title="Link to contribute readme" target="_blank">Contribute to project</a>

            </div>

          </section>

          <section class="site__section text-center">

            <h3>Built by Stefan Judis<br>& Marco Biedermann</h3>

            <ul class="list--inline list--unstyled">

              <li>
                <a href="https://twitter.com/stefanjudis" title="Link to Stefan on Twitter" target="_blank">
                  <span class="visuallyhidden">Stefan on Twitter</span>
                  <svg class="icon icon--2x icon--black animate--scale--hover">
                    <use xlink:href="/icons-<%= hash.svg %>.svg#icon-twitter" />
                  </svg>
                </a>
              </li>

              <li>
                <a href="https://github.com/stefanjudis" title="Link to Stefan on GitHub" target="_blank">
                  <span class="visuallyhidden">Stefan on Github</span>
                  <svg class="icon icon--2x icon--black animate--scale--hover">
                    <use xlink:href="/icons-<%= hash.svg %>.svg#icon-github" />
                  </svg>
                </a>
              </li>

              <li>
                <a href="mailto:stefanjudis@gmail.com" title="Send Stafan an email" target="_blank">
                  <span class="visuallyhidden">Stefan's email address</span>
                  <svg class="icon icon--2x icon--black animate--scale--hover">
                    <use xlink:href="/icons-<%= hash.svg %>.svg#icon-email" />
                  </svg>
                </a>
              </li>

            </ul>
            <ul class="list--inline list--unstyled">

              <li>
                <a href="https://github.com/marcobiedermann" title="Link to Marco on GitHub" target="_blank">
                  <span class="visuallyhidden">Marco on Github</span>
                  <svg class="icon icon--2x icon--black animate--scale--hover">
                    <use xlink:href="/icons-<%= hash.svg %>.svg#icon-github" />
                  </svg>
                </a>
              </li>

              <li>
                <a href="https://twitter.com/m412c0b" title="Link to Marco on Twitter" target="_blank">
                  <span class="visuallyhidden">Marco on Twitter</span>
                  <svg class="icon icon--2x icon--black animate--scale--hover">
                    <use xlink:href="/icons-<%= hash.svg %>.svg#icon-twitter" />
                  </svg>
                </a>
              </li>

            </ul>

          </section>

            <% if( contributors ) { %>

              <section class="section text-center">

                <div id="contributors" class="text-center">

                  <p>...with a little help from our friends</p>

                  <ul class="contributors list--inline list--unstyled">

                    <% _.each( contributors, function( contrib ) { %>
                      <% if ( contrib.login !== 'stefanjudis' && contrib.login !== 'marcobiedermann' ) { %>
                        <li><a href="<%= contrib.url.replace( 'api.','' ).replace( 'users/','' ) %>" data-url="<%= contrib.avatar_url + '&s=40' %>" data-login="<%= contrib.login %>" title="<%= contrib.login %> on GitHub" target="_blank"></a></li>
                      <% } %>
                    <% } ) %>

                  </ul>

                </div>

              </section>

            <% } %>

          </section>

          <section class="site__section text-center">

            <article class="article">

              <p><a href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fperf-tooling.today&text=@perf_tooling%20A%20resource%20collection%20to%20improve%20your%20workflow%20and%20to%20deliver%20better%20and%20faster%20websites%20%23perfmatters" target="_blank" class="btn btn--primary btn--large">Spread on Twitter</a></p>
              <p><a href="https://twitter.com/perf_tooling" class="link--text" title="perf-tooling on Twitter" target="_blank">Follow <strong>@perf_tooling</strong> on Twitter</a></p>

            </article>

          </section>

          <section class="text-center">

            <h2>Newsletter</h2>

            <div id="mc_embed_signup">

              <form action="//today.us9.list-manage.com/subscribe/post?u=8c4e72deda8b5599ce3bea3ff&amp;id=51ba0e71cf" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="form validate" target="_blank" novalidate>

                <div id="mc_embed_signup_scroll" class="form-field">

                  <label for="mce-EMAIL">Subscribe to our mailing list to get informed about our newest content.</label>
                  <div class="grid__col--6 center-block">

                    <input type="email" value="" name="EMAIL" class="email input-text" id="mce-EMAIL" placeholder="Enter your email" required>

                  </div>

                  <div style="position: absolute; left: -5000px;">

                    <input type="text" name="b_8c4e72deda8b5599ce3bea3ff_51ba0e71cf" tabindex="-1" value="">

                  </div>

                </div>

                <div class="form__field">

                  <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="btn btn--large btn--primary">

                </div>

              </form>

            </div>

          </section>

          <section class="site__section text-center">

            <h4 class="subline">Sponsored by</h4>
            <p><a href="https://www.fastly.com/" title="Link to Fastly CDN" target="_blank"><img src="<%= cdn %>/fastly_grey.svg" alt="Logo of CDN Fastly" width="160" height="72" class="center-block"></a></p>

          </section>

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

    <script src="<%= cdn %>/tooling-<%= hash.js %>.js" async></script>

  </body>

</html>
