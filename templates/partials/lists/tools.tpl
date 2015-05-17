<ul class="posts">

  <% _.each( list , function( tool ) { %>

    <li id="<%= tool.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' ) %>" class="post--tool <%= ( tool.hidden === true ) ? 'is-hidden' : '' %>">

      <h3><%= tool.name %></h3>

      <article class="article"><%= tool.description %></article>

      <ul class="resources">

        <% if ( tool.bookmarklet ) { %>

          <li class="resource--bookmarklet">

            <a href="<%= tool.bookmarklet %>" title="Link to bookmarklet" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-bookmarklet" />
              </svg>
              <span class="tooltip">Bookmarklet</span>
              <span class="stars"><%= ( tool.stars && tool.stars.bookmarklet ) ? tool.stars.bookmarklet + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.chrome ) { %>

          <li class="resource--chrome">

            <a href="<%= tool.chrome %>" title="Link to Chrome extension" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-chrome" />
              </svg>
              <span class="tooltip">Chrome</span>
              <span class="stars"><%= ( tool.stars && tool.stars.chrome ) ? tool.stars.chrome + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.firefox ) { %>

          <li class="resource--firefox">

            <a href="<%= tool.firefox %>" title="Link to Firefox extension" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-firefox" />
              </svg>
              <span class="tooltip">Firefox</span>
              <span class="stars"><%= ( tool.stars && tool.stars.firefox ) ? tool.stars.firefox + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.internetExplorer ) { %>

          <li class="resource--internet-explorer">

            <a href="<%= tool.internetExplorer %>" title="Link to Internet Explorer Extension" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-internet-explorer" />
              </svg>
              <span class="tooltip">Internet Explorer</span>
              <span class="stars"><%= ( tool.stars && tool.stars.internetExplorer ) ? tool.stars.internetExplorer + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.safari ) { %>

          <li class="resource--safari">

            <a href="<%= tool.safari %>" title="Link to Safari extension" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-safari" />
              </svg>
              <span class="tooltip">Safari</span>
              <span class="stars"><%= ( tool.stars && tool.stars.safari ) ? tool.stars.safari + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.mac ) { %>

          <li class="resource--mac">

            <a href="<%= tool.mac %>" title="Link to Mac application" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-apple" />
              </svg>
              <span class="tooltip">Mac</span>
              <span class="stars"><%= ( tool.stars && tool.stars.mac ) ? tool.stars.mac + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.windows ) { %>

          <li class="resource--windows">

            <a href="<%= tool.windows %>" title="Link to Windows application" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-windows" />
              </svg>
              <span class="tooltip">Windows</span>
              <span class="stars"><%= ( tool.stars && tool.stars.windows ) ? tool.stars.windows + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.linux ) { %>

          <li class="resource--linux">

            <a href="<%= tool.linux %>" title="Link to Linux application" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-linux" />
              </svg>
              <span class="tooltip">Linux</span>
              <span class="stars"><%= ( tool.stars && tool.stars.linux ) ? tool.stars.linux + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.cli ) { %>

          <li class="resource--cli">

            <a href="<%= tool.cli %>" title="Link to CLI" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-terminal" />
              </svg>
              <span class="tooltip">CLI</span>
              <span class="stars"><%= ( tool.stars && tool.stars.cli ) ? tool.stars.cli + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.module ) { %>

          <li class="resource--module">

            <a href="<%= tool.module %>" title="Link to Node module" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-module" />
              </svg>
              <span class="tooltip">Node module</span>
              <span class="stars"><%= ( tool.stars && tool.stars.module ) ? tool.stars.module + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.angular ) { %>

          <li class="resource--angular">

            <a href="<%= tool.angular %>" title="Link to AngularJS Script" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-angular" />
              </svg>
              <span class="tooltip">AngularJS Script</span>
              <span class="stars"><%= ( tool.stars && tool.stars.angular ) ? tool.stars.angular + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.broccoli ) { %>

          <li class="resource--broccoli">

            <a href="<%= tool.broccoli %>" title="Link to Broccoli plugin" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-broccoli" />
              </svg>
              <span class="tooltip">Broccoli plugin</span>
              <span class="stars"><%= ( tool.stars && tool.stars.broccoli ) ? tool.stars.broccoli + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.grunt ) { %>

          <li class="resource--grunt">

            <a href="<%= tool.grunt %>" title="Link to Grunt plugin" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-grunt" />
              </svg>
              <span class="tooltip">Grunt plugin</span>
              <span class="stars"><%= ( tool.stars && tool.stars.grunt ) ? tool.stars.grunt + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.gulp ) { %>

          <li class="resource--gulp">

            <a href="<%= tool.gulp %>" title="Link to Gulp plugin" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-gulp" />
              </svg>
              <span class="tooltip">gulp plugin</span>
              <span class="stars"><%= ( tool.stars && tool.stars.gulp ) ? tool.stars.gulp + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.illustrator ) { %>

          <li class="resource--illustrator">

            <a href="<%= tool.illustrator %>" title="Link to Illustrator Script" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-illustrator" />
              </svg>
              <span class="tooltip">Service</span>
              <span class="stars"><%= ( tool.stars && tool.stars.illustrator ) ? tool.stars.illustrator + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.javascript ) { %>

          <li class="resource--javascript">

            <a href="<%= tool.javascript %>" title="Link to Script" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-javascript" />
              </svg>
              <span class="tooltip">Javascript</span>
              <span class="stars"><%= ( tool.stars && tool.stars.javascript ) ? tool.stars.javascript + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.php ) { %>

          <li class="resource--php">

            <a href="<%= tool.php %>" title="Link to PHP" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-php" />
              </svg>
              <span class="tooltip">PHP</span>
              <span class="stars"><%= ( tool.stars && tool.stars.php ) ? tool.stars.php + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.ruby ) { %>

          <li class="resource--ruby">

            <a href="<%= tool.ruby %>" title="Link to Ruby" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-ruby" />
              </svg>
              <span class="tooltip">Ruby</span>
              <span class="stars"><%= ( tool.stars && tool.stars.ruby ) ? tool.stars.ruby + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.apache ) { %>

          <li class="resource--apache">

            <a href="<%= tool.apache %>" title="Link to Apache module" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-apache" />
              </svg>
              <span class="tooltip">Apache</span>
              <span class="stars"><%= ( tool.stars && tool.stars.apache ) ? tool.stars.apache + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.nginx ) { %>

          <li class="resource--nginx">

            <a href="<%= tool.nginx %>" title="Link to Nginx module" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-nginx" />
              </svg>
              <span class="tooltip">Nginx</span>
              <span class="stars"><%= ( tool.stars && tool.stars.nginx ) ? tool.stars.nginx + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.python ) { %>

          <li class="resource--python">

            <a href="<%= tool.python %>" title="Link to Python Script" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-python" />
              </svg>
              <span class="tooltip">Python</span>
              <span class="stars"><%= ( tool.stars.python ) ? tool.stars.python + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.wordpress ) { %>

          <li class="resource--wordpress">

            <a href="<%= tool.wordpress %>" title="Link to WordPress Plugin" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-wordpress" />
              </svg>
              <span class="tooltip">Wordpress</span>
              <span class="stars"><%= ( tool.stars && tool.stars.wordpress ) ? tool.stars.wordpress + '☆' : 'N/A' %></span>
            </a>

        <% } %>

        <% if ( tool.service ) { %>

          <li class="resource--service">

            <a href="<%= tool.service %>" title="Link to Service" target="_blank">
              <svg class="icon">
                <use xlink:href="/icons-<%= hash.svg %>.svg#icon-globe" />
              </svg>
              <span class="tooltip">Service</span>
              <span class="stars"><%= ( tool.stars && tool.stars.service ) ? tool.stars.service + '☆' : 'N/A' %></span>
            </a>

        <% } %>

      </ul>

      <% if ( tool.tags && tool.tags.length ) { %>

        <%=
          partial(
            'templates/partials/tags.tpl',
            {
              tags : tool.tags
            }
          )
        %>

      <% }%>

  <% } );%>

</ul>
