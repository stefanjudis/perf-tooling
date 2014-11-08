<header class="header">

  <div class="container">

    <div class="logo">
      <a href="/" title="perf-tooling logo"><img src="<%= cdn %>/perf-tooling.svg" alt="Link to home">
    </div>

    <nav class="nav nav-list nav-main">

      <button class="btn-nav">Menu</button>

      <ul>

        <li class="<%= ( active === 'index' ) ? 'is-active' : '' %>"><a href="/">Start</a></li>
        <li class="<%= ( active === 'tools' ) ? 'is-active' : '' %>"><a href="/tools">Tools</a></li>
        <li class="<%= ( active === 'articles' ) ? 'is-active' : '' %>"><a href="/articles">Articles</a></li>
        <li class="<%= ( active === 'videos' ) ? 'is-active' : '' %>"><a href="/videos">Videos</a></li>
        <li class="<%= ( active === 'slides' ) ? 'is-active' : '' %>"><a href="/slides">Slides</a></li>

      </ul>

    </nav>

  </div>

</header>
