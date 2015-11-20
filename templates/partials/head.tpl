<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta http-equiv="x-dns-prefetch-control" content="on">

  <title><%= ( name !== 'Index' ) ? name + ' | ' : '' %><%= site.name %></title>

  <meta name="theme-color" content="#01a5b1">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="<%= site.descriptions[ type ] %>">
  <meta name="apple-mobile-web-app-title" content="perf-tooling">

  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "Organization",
      "name" : "Perf-tooling Today",
      "url": "http://perf-tooling.today/",
      "founder": {
        "@type": "Person",
        "name": "Stefan Judis",
        "email": "stefanjudis@gmail.com"
      },
      "logo": "<%= cdn %>/apple-touch-icon-precomposed.png",
      "sameAs" : [
        "http://www.twitter.com/perf_tooling"
      ]
    }
  </script>

  <meta name="maincss"  content="<%= cdn %>/main-<%= hash.css %>.css">
  <% if ( !cssCookie || cssCookie !== hash.css ) { %>
  <style><%= css %></style>
  <% } else { %>
  <link rel="stylesheet" href="<%= cdn %>/main-<%= hash.css %>.css">
  <% } %>
  <script><%= enhance %></script>

  <noscript><link rel="stylesheet" href="<%= cdn %>/main-<%= hash.css %>.css"></noscript>

  <link rel="dns-prefetch" href="http://www.google-analytics.com/">
  <link rel="dns-prefetch" href="https://avatars.githubusercontent.com/">

  <link rel="icon" href="<%= cdn %>/apple-touch-icon-precomposed.png">
  <link rel="apple-touch-icon" href="<%= cdn %>/apple-touch-icon-precomposed.png">

  <% if ( typeof query !== 'undefined' && query.length ) { %>
    <link rel="canonical" href="http://perf-tooling.today/<%= type %>" />
  <% } %>

  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-53831300-1', 'auto');
    ga('send', 'pageview');
  </script>
</head>
