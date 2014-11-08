<ul class="posts text-center">
  <% _.each( list , function( tool ) { %>
    <li id="<%= tool.name.replace( ' ', '-' ) %>">
      <h3><%= tool.name %></h3>
      <div class="posts--content"><%= tool.description %></div>
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

        <% if ( tool.cli ) { %>
          <li class="tooltip" title="CLI">
            <a href="<%= tool.cli %>" class="cli">
              <svg>
                <use xlink:href="#icon-cli" />
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
                <use xlink:href="#icon-script" />
              </svg>
              Script
            </a>

            <span><%= ( tool.stars.script ) ? tool.stars.script : 'N/A' %></span>
        <% } %>

        <% if ( tool.service ) { %>
          <li class="tooltip" title="Service">
            <a href="<%= tool.service %>" class="service">
              <svg>
                <use xlink:href="#icon-service" />
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
