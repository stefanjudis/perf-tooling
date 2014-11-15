<ul class="posts">

  <% _.each( list , function( tool ) { %>

    <li id="<%= tool.name.replace( /\s/g, '-' ) %>" class="post-tool">

      <h3><%= tool.name %></h3>

      <div class="post-content"><%= tool.description %></div>

      <ul class="resources">

        <% if ( tool.bookmarklet ) { %>

          <li class="tooltip" title="Bookmarklet" role="tooltip">

            <a href="<%= tool.bookmarklet %>" class="bookmarklet" target="_blank">
              <svg>
                <use xlink:href="#icon-bookmarklet" />
              </svg>
              Bookmarklet
            </a>

            <span><%= ( tool.stars.bookmarklet ) ? tool.stars.bookmarklet : 'N/A' %></span>

        <% } %>

        <% if ( tool.chrome ) { %>

          <li class="tooltip" title="Chrome extension" role="tooltip">

            <a href="<%= tool.chrome %>" class="chrome" target="_blank">
              <svg>
                <use xlink:href="#icon-chrome" />
              </svg>
              Chrome
            </a>

            <span><%= ( tool.stars.chrome ) ? tool.stars.chrome : 'N/A' %></span>

        <% } %>

        <% if ( tool.firefox ) { %>

          <li class="tooltip" title="Firefox extension role="tooltip"">

            <a href="<%= tool.firefox %>" class="firefox" target="_blank">
              <svg>
                <use xlink:href="#icon-firefox" />
              </svg>
              Firefox
            </a>

            <span><%= ( tool.stars.firefox ) ? tool.stars.firefox : 'N/A' %></span>

        <% } %>

        <% if ( tool.internetExplorer ) { %>

          <li class="tooltip" title="Internet Explorer role="tooltip" extension">

            <a href="<%= tool.internetExplorer %>" class="internet-explorer" target="_blank">
              <svg>
                <use xlink:href="#icon-internet-explorer" />
              </svg>
              Internet Explorer
            </a>

            <span><%= ( tool.stars.internetExplorer ) ? tool.stars.internetExplorer : 'N/A' %></span>

        <% } %>

        <% if ( tool.safari ) { %>

          <li class="tooltip" title="Safari extension" role="tooltip">

            <a href="<%= tool.safari %>" class="safari" target="_blank">
              <svg>
                <use xlink:href="#icon-safari" />
              </svg>
              Safari
            </a>

            <span><%= ( tool.stars.safari ) ? tool.stars.safari : 'N/A' %></span>

        <% } %>

        <% if ( tool.mac ) { %>

          <li class="tooltip" title="Mac Application" role="tooltip">

            <a href="<%= tool.mac %>" class="mac" target="_blank">
              <svg>
                <use xlink:href="#icon-apple" />
              </svg>
              Mac
            </a>

            <span><%= ( tool.mac.safari ) ? tool.mac.safari : 'N/A' %></span>

        <% } %>

        <% if ( tool.windows ) { %>

          <li class="tooltip" title="Windows role="tooltip" Application">

            <a href="<%= tool.windows %>" class="windows" target="_blank">
              <svg>
                <use xlink:href="#icon-windows" />
              </svg>
              Windows
            </a>

            <span><%= ( tool.stars.windows ) ? tool.stars.windows : 'N/A' %></span>

        <% } %>

        <% if ( tool.linux ) { %>

          <li class="tooltip" title="Linux Application role="tooltip"">

            <a href="<%= tool.linux %>" class="linux" target="_blank">
              <svg>
                <use xlink:href="#icon-linux" />
              </svg>
              Linux
            </a>

            <span><%= ( tool.stars.linux ) ? tool.stars.linux : 'N/A' %></span>

        <% } %>

        <% if ( tool.cli ) { %>

          <li class="tooltip" title="CLI" role="tooltip">

            <a href="<%= tool.cli %>" class="cli" target="_blank">
              <svg>
                <use xlink:href="#icon-terminal" />
              </svg>
              CLI
            </a>

            <span><%= ( tool.stars.cli ) ? tool.stars.cli : 'N/A' %></span>

        <% } %>

        <% if ( tool.module ) { %>

          <li class="tooltip" title="Node module" role="tooltip">

            <a href="<%= tool.module %>" class="module" target="_blank">
              <svg>
                <use xlink:href="#icon-module" />
              </svg>
              Node module
            </a>

            <span><%= ( tool.stars.module ) ? tool.stars.module : 'N/A' %></span>

        <% } %>

        <% if ( tool.grunt ) { %>

          <li class="tooltip" title="Grunt plugin" role="tooltip">

            <a href="<%= tool.grunt %>" class="grunt" target="_blank">
              <svg>
                <use xlink:href="#icon-grunt" />
              </svg>
              Grunt plugin
            </a>

            <span><%= ( tool.stars.grunt ) ? tool.stars.grunt : 'N/A' %></span>

        <% } %>

        <% if ( tool.gulp ) { %>

          <li class="tooltip" title="gulp plugin" role="tooltip">

            <a href="<%= tool.gulp %>" class="gulp" target="_blank">
              <svg>
                <use xlink:href="#icon-gulp" />
              </svg>
              gulp plugin
            </a>

            <span><%= ( tool.stars.gulp ) ? tool.stars.gulp : 'N/A' %></span>

        <% } %>

        <% if ( tool.script ) { %>

          <li class="tooltip" title="Script" role="tooltip">

            <a href="<%= tool.script %>" class="script" target="_blank">
              <svg>
                <use xlink:href="#icon-javascript" />
              </svg>
              Script
            </a>

            <span><%= ( tool.stars.script ) ? tool.stars.script : 'N/A' %></span>

        <% } %>

        <% if ( tool.service ) { %>

          <li class="tooltip" title="Service" role="tooltip">

            <a href="<%= tool.service %>" class="service" target="_blank">
              <svg>
                <use xlink:href="#icon-globe" />
              </svg>
              Service
            </a>

            <span><%= ( tool.stars.service ) ? tool.stars.service : 'N/A' %></span>

        <% } %>

      </ul>

      <% if ( tool.tags && tool.tags.length ) { %>

        <ul class="tags">

          <% _.each( tool.tags, function( tag ) { %>
            <li><%= tag %>
          <% } );%>

        </ul>

      <% }%>

  <% } );%>

</ul>
