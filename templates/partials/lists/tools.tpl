<ul class="posts">

  <% _.each( list , function( tool ) { %>

    <li id="<%= tool.name.replace( ' ', '-' ) %>" class="post-tool">

      <h3><%= tool.name %></h3>

      <div class="post-content"><%= tool.description %></div>

      <ul class="resources">

        <% if ( tool.bookmarklet ) { %>

          <li class="tooltip" title="Bookmarklet">

            <a href="<%= tool.bookmarklet %>" class="bookmarklet">
              <svg>
                <use xlink:href="#icon-bookmarklet" />
              </svg>
              Bookmarklet
            </a>

            <span><%= ( tool.stars.bookmarklet ) ? tool.stars.bookmarklet : 'N/A' %></span>

        <% } %>

        <% if ( tool.chrome ) { %>

          <li class="tooltip" title="Chrome extension">

            <a href="<%= tool.chrome %>" class="chrome">
              <svg>
                <use xlink:href="#icon-chrome" />
              </svg>
              Chrome extension
            </a>

            <span><%= ( tool.stars.chrome ) ? tool.stars.chrome : 'N/A' %></span>

        <% } %>

        <% if ( tool.firefox ) { %>

          <li class="tooltip" title="Firefox extension">

            <a href="<%= tool.firefox %>" class="firefox">
              <svg>
                <use xlink:href="#icon-firefox" />
              </svg>
              Firefox extension
            </a>

            <span><%= ( tool.stars.firefox ) ? tool.stars.firefox : 'N/A' %></span>

        <% } %>

        <% if ( tool.internetExplorer ) { %>

          <li class="tooltip" title="Internet Explorer extension">

            <a href="<%= tool.internetExplorer %>" class="internet-explorer">
              <svg>
                <use xlink:href="#icon-internet-explorer" />
              </svg>
              Internet Explorer extension
            </a>

            <span><%= ( tool.stars.internetExplorer ) ? tool.stars.internetExplorer : 'N/A' %></span>

        <% } %>

        <% if ( tool.safari ) { %>

          <li class="tooltip" title="Safari extension">

            <a href="<%= tool.safari %>" class="safari">
              <svg>
                <use xlink:href="#icon-safari" />
              </svg>
              Safari extension
            </a>

            <span><%= ( tool.stars.safari ) ? tool.stars.safari : 'N/A' %></span>

        <% } %>

        <% if ( tool.cli ) { %>

          <li class="tooltip" title="CLI">

            <a href="<%= tool.cli %>" class="cli">
              <svg>
                <use xlink:href="#icon-terminal" />
              </svg>
              CLI
            </a>

            <span><%= ( tool.stars.cli ) ? tool.stars.cli : 'N/A' %></span>

        <% } %>

        <% if ( tool.module ) { %>

          <li class="tooltip" title="Node module">

            <a href="<%= tool.module %>" class="module">
              <svg>
                <use xlink:href="#icon-module" />
              </svg>
              Node module
            </a>

            <span><%= ( tool.stars.module ) ? tool.stars.module : 'N/A' %></span>

        <% } %>

        <% if ( tool.grunt ) { %>

          <li class="tooltip" title="Grunt plugin">

            <a href="<%= tool.grunt %>" class="grunt">
              <svg>
                <use xlink:href="#icon-grunt" />
              </svg>
              Grunt plugin
            </a>

            <span><%= ( tool.stars.grunt ) ? tool.stars.grunt : 'N/A' %></span>

        <% } %>

        <% if ( tool.gulp ) { %>

          <li class="tooltip" title="gulp plugin">

            <a href="<%= tool.gulp %>" class="gulp">
              <svg>
                <use xlink:href="#icon-gulp" />
              </svg>
              gulp plugin
            </a>

            <span><%= ( tool.stars.gulp ) ? tool.stars.gulp : 'N/A' %></span>

        <% } %>

        <% if ( tool.script ) { %>

          <li class="tooltip" title="Script">

            <a href="<%= tool.script %>" class="script">
              <svg>
                <use xlink:href="#icon-javascript" />
              </svg>
              Script
            </a>

            <span><%= ( tool.stars.script ) ? tool.stars.script : 'N/A' %></span>

        <% } %>

        <% if ( tool.service ) { %>

          <li class="tooltip" title="Service">

            <a href="<%= tool.service %>" class="service">
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
