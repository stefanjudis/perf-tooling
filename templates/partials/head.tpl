<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta http-equiv="x-dns-prefetch-control" content="on">

  <title><%= site.name %></title>

  <meta name="theme-color" content="#01a5b1">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Perf Tooling Today lists a lot of tools, articles, videos and slides to make the web faster. We cover resources to automize and monitore your workflow.">
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
      "logo": "<%= cdn %>/apple-touch-icon-152x152-precomposed.png",
      "sameAs" : [
        "http://www.twitter.com/perf_tooling"
      ]
    }
  </script>

  <meta name="maincss"  content="<%= cdn %>/main.css?<%= hash.css %>">
  <% if ( !mainCSSCookie ) { %>
  <style><%= css %></style>
  <% } else { %>
  <link rel="stylesheet" href="<%= cdn %>/main.css?<%= hash.css %>">
  <% } %>
  <script><%= enhance %></script>

  <link rel="dns-prefetch" href="http://www.google-analytics.com/">
  <link rel="dns-prefetch" href="https://avatars.githubusercontent.com/">

  <link rel="shortcut icon" href="favicon.ico">
  <link rel="icon" type="image/png" sizes="16x16" href="<%= cdn %>/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="<%= cdn %>/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96" href="<%= cdn %>/favicon-96x96.png">
  <link rel="apple-touch-icon" sizes="57x57" href="<%= cdn %>/apple-touch-icon-57x57-precomposed.png">
  <link rel="apple-touch-icon" sizes="114x114" href="<%= cdn %>/apple-touch-icon-114x114-precomposed.png">
  <link rel="apple-touch-icon" sizes="72x72" href="<%= cdn %>/apple-touch-icon-72x72-precomposed.png">
  <link rel="apple-touch-icon" sizes="144x144" href="<%= cdn %>/apple-touch-icon-144x144-precomposed.png">
  <link rel="apple-touch-icon" sizes="60x60" href="<%= cdn %>/apple-touch-icon-60x60-precomposed.png">
  <link rel="apple-touch-icon" sizes="120x120" href="<%= cdn %>/apple-touch-icon-120x120-precomposed.png">
  <link rel="apple-touch-icon" sizes="76x76" href="<%= cdn %>/apple-touch-icon-76x76-precomposed.png">
  <link rel="apple-touch-icon" sizes="152x152" href="<%= cdn %>/apple-touch-icon-152x152-precomposed.png">


</head>
