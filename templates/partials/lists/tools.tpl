<ul class="posts">

  <% _.each( list , function( tool ) { %>

    <li id="<%= tool.name.replace( /\s/g, '-' ) %>" class="post-tool <%= ( tool.hidden === true ) ? 'is-hidden' : '' %>">

      <h3><%= tool.name %></h3>

      <div class="post-content"><%= tool.description %></div>

      <ul class="resources">

        <% if ( tool.bookmarklet ) { %>

          <li class="tooltip" title="Bookmarklet">

            <a href="<%= tool.bookmarklet %>" title="Link to bookmarklet" class="bookmarklet" target="_blank">
              <svg>
                <use xlink:href="#icon-bookmarklet" />
              </svg>
              Bookmarklet
            </a>

            <span><%= ( tool.stars.bookmarklet ) ? tool.stars.bookmarklet : 'N/A' %></span>

        <% } %>

        <% if ( tool.chrome ) { %>

          <li class="tooltip" title="Chrome extension">

            <a href="<%= tool.chrome %>" title="Link to Chrome extension" class="chrome" target="_blank">
              <svg>
                <use xlink:href="#icon-chrome" />
              </svg>
              Chrome
            </a>

            <span><%= ( tool.stars.chrome ) ? tool.stars.chrome : 'N/A' %></span>

        <% } %>

        <% if ( tool.firefox ) { %>

          <li class="tooltip" title="Firefox extension">

            <a href="<%= tool.firefox %>" title="Link to Firefox extension" class="firefox" target="_blank">
              <svg>
                <use xlink:href="#icon-firefox" />
              </svg>
              Firefox
            </a>

            <span><%= ( tool.stars.firefox ) ? tool.stars.firefox : 'N/A' %></span>

        <% } %>

        <% if ( tool.internetExplorer ) { %>

          <li class="tooltip" title="Internet Explorer extension">

            <a href="<%= tool.internetExplorer %>" title="Link to Internet Explorer Extension" class="internet-explorer" target="_blank">
              <svg>
                <use xlink:href="#icon-internet-explorer" />
              </svg>
              Internet Explorer
            </a>

            <span><%= ( tool.stars.internetExplorer ) ? tool.stars.internetExplorer : 'N/A' %></span>

        <% } %>

        <% if ( tool.safari ) { %>

          <li class="tooltip" title="Safari extension">

            <a href="<%= tool.safari %>" title="Link to Safari extension" class="safari" target="_blank">
              <svg>
                <use xlink:href="#icon-safari" />
              </svg>
              Safari
            </a>

            <span><%= ( tool.stars.safari ) ? tool.stars.safari : 'N/A' %></span>

        <% } %>

        <% if ( tool.mac ) { %>

          <li class="tooltip" title="Mac Application">

            <a href="<%= tool.mac %>" title="Link to Mac application" class="mac" target="_blank">
              <svg>
                <use xlink:href="#icon-apple" />
              </svg>
              Mac
            </a>

            <span><%= ( tool.mac.safari ) ? tool.mac.safari : 'N/A' %></span>

        <% } %>

        <% if ( tool.windows ) { %>

          <li class="tooltip" title="Windows Application">

            <a href="<%= tool.windows %>" title="Link to Windows application" class="windows" target="_blank">
              <svg>
                <use xlink:href="#icon-windows" />
              </svg>
              Windows
            </a>

            <span><%= ( tool.stars.windows ) ? tool.stars.windows : 'N/A' %></span>

        <% } %>

        <% if ( tool.linux ) { %>

          <li class="tooltip" title="Linux Application">

            <a href="<%= tool.linux %>" title="Link to Linux application" class="linux" target="_blank">
              <svg>
                <use xlink:href="#icon-linux" />
              </svg>
              Linux
            </a>

            <span><%= ( tool.stars.linux ) ? tool.stars.linux : 'N/A' %></span>

        <% } %>

        <% if ( tool.cli ) { %>

          <li class="tooltip" title="CLI">

            <a href="<%= tool.cli %>" title="Link to CLI" class="cli" target="_blank">
              <svg>
                <use xlink:href="#icon-terminal" />
              </svg>
              CLI
            </a>

            <span><%= ( tool.stars.cli ) ? tool.stars.cli : 'N/A' %></span>

        <% } %>

        <% if ( tool.module ) { %>

          <li class="tooltip" title="Node module">

            <a href="<%= tool.module %>" title="Link to Node module" class="module" target="_blank">
              <svg>
                <use xlink:href="#icon-module" />
              </svg>
              Node module
            </a>

            <span><%= ( tool.stars.module ) ? tool.stars.module : 'N/A' %></span>

        <% } %>

        <% if ( tool.grunt ) { %>

          <li class="tooltip" title="Grunt plugin">

            <a href="<%= tool.grunt %>" title="Link to Grunt plugin" class="grunt" target="_blank">
              <svg>
                <use xlink:href="#icon-grunt" />
              </svg>
              Grunt plugin
            </a>

            <span><%= ( tool.stars.grunt ) ? tool.stars.grunt : 'N/A' %></span>

        <% } %>

        <% if ( tool.gulp ) { %>

          <li class="tooltip" title="gulp plugin">

            <a href="<%= tool.gulp %>" title="Link to Gulp plugin" class="gulp" target="_blank">
              <svg>
                <use xlink:href="#icon-gulp" />
              </svg>
              gulp plugin
            </a>

            <span><%= ( tool.stars.gulp ) ? tool.stars.gulp : 'N/A' %></span>

        <% } %>

        <% if ( tool.script ) { %>

          <li class="tooltip" title="Script">

            <a href="<%= tool.script %>" title="Link to Scrip" class="script" target="_blank">
              <svg>
                <use xlink:href="#icon-javascript" />
              </svg>
              Script
            </a>

            <span><%= ( tool.stars.script ) ? tool.stars.script : 'N/A' %></span>

        <% } %>

        <% if ( tool.service ) { %>

          <li class="tooltip" title="Service">

            <a href="<%= tool.service %>" title="Link to Service" class="service" target="_blank">
              <svg>
                <use xlink:href="#icon-globe" />
              </svg>
              Service
            </a>

            <span><%= ( tool.stars.service ) ? tool.stars.service : 'N/A' %></span>

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
