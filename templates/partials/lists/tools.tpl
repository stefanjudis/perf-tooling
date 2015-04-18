<ul class="posts">

  <% _.each( list , function( tool ) { %>

    <li id="<%= tool.id %>" class="post-tool <%= ( tool.hidden === true ) ? 'is-hidden' : '' %>">

      <h3><%= tool.name %></h3>

      <article class="article"><%= tool.description %></article>

      <ul class="resources">

        <% if ( tool.bookmarklet ) { %>

          <li class="tooltip" title="Bookmarklet">

            <a href="<%= tool.bookmarklet %>" title="Link to bookmarklet" class="resource-bookmarklet" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-bookmarklet" />
              </svg>
              Bookmarklet
            </a>

            <span><%= ( tool.stars && tool.stars.bookmarklet ) ? tool.stars.bookmarklet : 'N/A' %></span>

        <% } %>

        <% if ( tool.chrome ) { %>

          <li class="tooltip" title="Chrome extension">

            <a href="<%= tool.chrome %>" title="Link to Chrome extension" class="resource-chrome" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-chrome" />
              </svg>
              Chrome
            </a>

            <span><%= ( tool.stars && tool.stars.chrome ) ? tool.stars.chrome : 'N/A' %></span>

        <% } %>

        <% if ( tool.firefox ) { %>

          <li class="tooltip" title="Firefox extension">

            <a href="<%= tool.firefox %>" title="Link to Firefox extension" class="resource-firefox" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-firefox" />
              </svg>
              Firefox
            </a>

            <span><%= ( tool.stars && tool.stars.firefox ) ? tool.stars.firefox : 'N/A' %></span>

        <% } %>

        <% if ( tool.internetExplorer ) { %>

          <li class="tooltip" title="Internet Explorer extension">

            <a href="<%= tool.internetExplorer %>" title="Link to Internet Explorer Extension" class="resource-internet-explorer" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-internet-explorer" />
              </svg>
              Internet Explorer
            </a>

            <span><%= ( tool.stars && tool.stars.internetExplorer ) ? tool.stars.internetExplorer : 'N/A' %></span>

        <% } %>

        <% if ( tool.safari ) { %>

          <li class="tooltip" title="Safari extension">

            <a href="<%= tool.safari %>" title="Link to Safari extension" class="resource-safari" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-safari" />
              </svg>
              Safari
            </a>

            <span><%= ( tool.stars && tool.stars.safari ) ? tool.stars.safari : 'N/A' %></span>

        <% } %>

        <% if ( tool.mac ) { %>

          <li class="tooltip" title="Mac Application">

            <a href="<%= tool.mac %>" title="Link to Mac application" class="resource-mac" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-apple" />
              </svg>
              Mac
            </a>

            <span><%= ( tool.stars && tool.stars.mac ) ? tool.stars.mac : 'N/A' %></span>

        <% } %>

        <% if ( tool.windows ) { %>

          <li class="tooltip" title="Windows Application">

            <a href="<%= tool.windows %>" title="Link to Windows application" class="resource-windows" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-windows" />
              </svg>
              Windows
            </a>

            <span><%= ( tool.stars && tool.stars.windows ) ? tool.stars.windows : 'N/A' %></span>

        <% } %>

        <% if ( tool.linux ) { %>

          <li class="tooltip" title="Linux Application">

            <a href="<%= tool.linux %>" title="Link to Linux application" class="resource-linux" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-linux" />
              </svg>
              Linux
            </a>

            <span><%= ( tool.stars && tool.stars.linux ) ? tool.stars.linux : 'N/A' %></span>

        <% } %>

        <% if ( tool.cli ) { %>

          <li class="tooltip" title="CLI">

            <a href="<%= tool.cli %>" title="Link to CLI" class="resource-cli" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-terminal" />
              </svg>
              CLI
            </a>

            <span><%= ( tool.stars && tool.stars.cli ) ? tool.stars.cli : 'N/A' %></span>

        <% } %>

        <% if ( tool.module ) { %>

          <li class="tooltip" title="Node module">

            <a href="<%= tool.module %>" title="Link to Node module" class="resource-module" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-module" />
              </svg>
              Node module
            </a>

            <span><%= ( tool.stars && tool.stars.module ) ? tool.stars.module : 'N/A' %></span>

        <% } %>

        <% if ( tool.angular ) { %>

          <li class="tooltip" title="AngularJS Script">

            <a href="<%= tool.angular %>" title="Link to AngularJS Script" class="resource-angular" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-angular" />
              </svg>
              AngularJS Script
            </a>

            <span><%= ( tool.stars && tool.stars.angular ) ? tool.stars.angular : 'N/A' %></span>

        <% } %>

        <% if ( tool.broccoli ) { %>

          <li class="tooltip" title="Broccoli plugin">

            <a href="<%= tool.broccoli %>" title="Link to Broccoli plugin" class="resource-broccoli" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-broccoli" />
              </svg>
              Broccoli plugin
            </a>

            <span><%= ( tool.stars && tool.stars.broccoli ) ? tool.stars.broccoli : 'N/A' %></span>

        <% } %>

        <% if ( tool.grunt ) { %>

          <li class="tooltip" title="Grunt plugin">

            <a href="<%= tool.grunt %>" title="Link to Grunt plugin" class="resource-grunt" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-grunt" />
              </svg>
              Grunt plugin
            </a>

            <span><%= ( tool.stars && tool.stars.grunt ) ? tool.stars.grunt : 'N/A' %></span>

        <% } %>

        <% if ( tool.gulp ) { %>

          <li class="tooltip" title="gulp plugin">

            <a href="<%= tool.gulp %>" title="Link to Gulp plugin" class="resource-gulp" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-gulp" />
              </svg>
              gulp plugin
            </a>

            <span><%= ( tool.stars && tool.stars.gulp ) ? tool.stars.gulp : 'N/A' %></span>

        <% } %>

        <% if ( tool.illustrator ) { %>

          <li class="tooltip" title="Illustrator Script">

            <a href="<%= tool.illustrator %>" title="Link to Illustrator Script" class="resource-illustrator" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-illustrator" />
              </svg>
              Service
            </a>

            <span><%= ( tool.stars && tool.stars.illustrator ) ? tool.stars.illustrator : 'N/A' %></span>

        <% } %>

        <% if ( tool.javascript ) { %>

          <li class="tooltip" title="Javascript">

            <a href="<%= tool.javascript %>" title="Link to Script" class="resource-javascript" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-javascript" />
              </svg>
              Javascript
            </a>

            <span><%= ( tool.stars && tool.stars.javascript ) ? tool.stars.javascript : 'N/A' %></span>

        <% } %>

        <% if ( tool.php ) { %>

          <li class="tooltip" title="PHP">

            <a href="<%= tool.php %>" title="Link to PHP" class="resource-php" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-php" />
              </svg>
              PHP
            </a>

            <span><%= ( tool.stars && tool.stars.php ) ? tool.stars.php : 'N/A' %></span>

        <% } %>

        <% if ( tool.ruby ) { %>

          <li class="tooltip" title="Ruby">

            <a href="<%= tool.ruby %>" title="Link to Ruby" class="resource-ruby" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-ruby" />
              </svg>
              Ruby
            </a>

            <span><%= ( tool.stars && tool.stars.ruby ) ? tool.stars.ruby : 'N/A' %></span>

        <% } %>

        <% if ( tool.apache ) { %>

          <li class="tooltip" title="Apache module">

            <a href="<%= tool.apache %>" title="Link to Apache module" class="resource-apache" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-apache" />
              </svg>
              Apache
            </a>

            <span><%= ( tool.stars && tool.stars.apache ) ? tool.stars.apache : 'N/A' %></span>

        <% } %>

        <% if ( tool.nginx ) { %>

          <li class="tooltip" title="Nginx module">

            <a href="<%= tool.nginx %>" title="Link to Nginx module" class="resource-nginx" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-nginx" />
              </svg>
              Nginx
            </a>

            <span><%= ( tool.stars && tool.stars.nginx ) ? tool.stars.nginx : 'N/A' %></span>

        <% } %>

        <% if ( tool.python ) { %>

          <li class="tooltip" title="Python Script">

            <a href="<%= tool.python %>" title="Link to Python Script" class="resource-python" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-python" />
              </svg>
              Python
            </a>

            <span><%= ( tool.stars.python ) ? tool.stars.python : 'N/A' %></span>

        <% } %>

        <% if ( tool.wordpress ) { %>

          <li class="tooltip" title="WordPress">

            <a href="<%= tool.wordpress %>" title="Link to WordPress Plugin" class="resource-wordpress" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-wordpress" />
              </svg>
              Wordpress
            </a>

            <span><%= ( tool.stars && tool.stars.wordpress ) ? tool.stars.wordpress : 'N/A' %></span>

        <% } %>

        <% if ( tool.service ) { %>

          <li class="tooltip" title="Service">

            <a href="<%= tool.service %>" title="Link to Service" class="resource-service" target="_blank">
              <svg>
                <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-globe" />
              </svg>
              Service
            </a>

            <span><%= ( tool.stars && tool.stars.service ) ? tool.stars.service : 'N/A' %></span>

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
