<header class="clearfix">
  <nav class="container">
    <ul class="nav--list">
      <li class="nav--list--item"><a href="/"><img class="logo" src="<%= cdn %>/perf-tooling.svg" alt="Link to home">
      <li class="nav--list--item <%= ( active === 'index' ) ? 'is-active' : '' %>"><a href="/">Start</a>
      <li class="nav--list--item <%= ( active === 'tools' ) ? 'is-active' : '' %>"><a href="/tools">Tools</a>
      <li class="nav--list--item <%= ( active === 'articles' ) ? 'is-active' : '' %>"><a href="/articles">Articles</a>
      <li class="nav--list--item <%= ( active === 'videos' ) ? 'is-active' : '' %>"><a href="/videos">Videos</a>
      <li class="nav--list--item <%= ( active === 'slides' ) ? 'is-active' : '' %>"><a href="/slides">Slides</a>
    </ul>
  </nav>
</header>
