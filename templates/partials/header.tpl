<header class="site__header" role="banner">
  <div class="grid__container">
    <div class="site__logo">
      <a href="/" title="Link to home"><img src="<%= cdn %>/perf-tooling.svg" width="64" height="43" alt="perf-tooling logo">
    </div>

    <nav class="nav--main" role="navigation">

      <button class="btn--nav">
        <span class="visuallyhidden">Menu</span>
        <svg>
          <use xlink:href="/icons-<%= hash.svg %>.svg#icon-menu" />
        </svg>
      </button>

      <ul>

        <%= ( active === 'index' ) ? '<li class="is-active"><span>Start</span></li>' : '<li><a href="/" title="Link to start">Start</a></li>' %>
        <%= ( active === 'tools' ) ? '<li class="is-active"><span>Tools</span></li>' : '<li><a href="/tools" title="Link to tools">Tools</a></li>' %>
        <%= ( active === 'articles' ) ? '<li class="is-active"><span>Articles</span></li>' : '<li><a href="/articles" title="Link to articles">Articles</a></li>' %>
        <%= ( active === 'videos' ) ? '<li class="is-active"><span>Videos</span></li>' : '<li><a href="/videos" title="Link to videos">Videos</a></li>' %>
        <%= ( active === 'slides' ) ? '<li class="is-active"><span>Slides</span></li>' : '<li><a href="/slides" title="Link to slides">Slides</a></li>' %>
        <%= ( active === 'books' ) ? '<li class="is-active"><span>Books</span></li>' : '<li><a href="/books" title="Link to books">Books</a></li>' %>
        <%= ( active === 'courses' ) ? '<li class="is-active"><span>Courses</span></li>' : '<li><a href="/courses" title="Link to courses">Courses</a></li>' %>
      </ul>

    </nav>

  </div>

</header>
