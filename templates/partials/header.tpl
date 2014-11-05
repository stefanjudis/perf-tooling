<header class="clearfix">
  <a href="https://github.com/stefanjudis/perf-tooling" class="ribbon">Fork it on Github</a>
  <img class="logo" src="<%= cdn %>/perf-tooling.svg">
  <h1 class="title"><%= site.name %></h1>
  <nav>
    <ul class="nav--list">
      <li class="nav--list--item"><a href="/">Start</a>
      <li class="nav--list--item <%= ( active === 'tools' ) ? 'is-active' : '' %>"><a href="/tools">Tools</a>
      <li class="nav--list--item <%= ( active === 'articles' ) ? 'is-active' : '' %>"><a href="/articles">Articles</a>
      <li class="nav--list--item <%= ( active === 'videos' ) ? 'is-active' : '' %>"><a href="/videos">Videos</a>
      <li class="nav--list--item <%= ( active === 'slides' ) ? 'is-active' : '' %>"><a href="/slides">Slides</a>
    </ul>
  </nav>
</header>
