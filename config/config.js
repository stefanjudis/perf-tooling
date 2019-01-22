module.exports = {
  cdn       : process.env.CDN_URL || '',
  dataDir   : 'data',
  listPages : [ 'articles', 'slides', 'tools', 'videos', 'books', 'courses', 'audits' ],
  github    : {
    id    : process.env.GITHUB_ID,
    token : process.env.GITHUB_TOKEN
  },
  platforms : [
    {
      name        : 'angular',
      description : 'Angular Script'
    },
    {
      name        : 'apache',
      description : 'Apache Module'
    },
    {
      name        : 'bookmarklet',
      description : 'Bookmarklet'
    },
    {
      name        : 'broccoli',
      description : 'Broccoli Plugin'
    },
    {
      name        : 'chrome',
      description : 'Chrome Extension'
    },
    {
      name        : 'cli',
      description : 'CLI'
    },
    {
      name        : 'firefox',
      description : 'Firefox Extension'
    },
    {
      name        : 'googleAppsScript',
      description : 'Google Apps Script'
    },
    {
      name        : 'grunt',
      description : 'Grunt Plugin'
    },
    {
      name        : 'gulp',
      description : 'Gulp Plugin'
    },
    {
      name        : 'illustrator',
      description : 'Illustrator Extension'
    },
    {
      name        : 'java',
      description : 'Java Class'
    },
    {
      name        : 'javascript',
      description : 'JavaScript'
    },
    {
      name        : 'linux',
      description : 'Linux App'
    },
    {
      name        : 'mac',
      description : 'Mac App'
    },
    {
      name        : 'nginx',
      description : 'Nginx Module'
    },
    {
      name        : 'node',
      description : 'Node Module'
    },
    {
      name        : 'php',
      description : 'PHP Script'
    },
    {
      name        : 'python',
      description : 'Python Script'
    },
    {
      name        : 'ruby',
      description : 'Ruby Script'
    },
    {
      name        : 'safari',
      description : 'Safari Extension'
    },
    {
      name        : 'service',
      description : 'Web Service'
    },
    {
      name        : 'windows',
      description : 'Windows App'
    },
    {
      name        : 'wordpress',
      description : 'WordPress Plugin'
    }
  ],
  timings : {
    requestDelay : 2000,
  },
  site      : {
    name   : 'Performance Tooling Today',
    descriptions : {
      index    : 'Perf Tooling Today lists a lot of tools, articles, videos, slides and courses to make the web faster. We cover resources to automize and monitore your workflow.',
      tools    : 'Tooling plays a key role when developing fast websites. Perf Tooling Today lists a lot of tools that can help you improve your workflow.',
      articles : 'Perf Tooling Today includes a lot of recent articles on best practices and new ways to improve the performance of your sites.',
      slides   : 'Perf Tooling Today includes a lot of recent slidedecks on best practices and new ways to improve the performance of your sites.',
      videos   : 'Perf Tooling Today includes a lot of recent videos on best practices and new ways to improve the performance of your sites.',
      courses  : 'Perf Tooling Today includes a lot of recent courses on best practices and new ways to improve the performance of your sites.'
    }
  },
  templates : {
    index : './templates/index.tpl',
    list  : './templates/list.tpl'
  },
  twitter : {
    consumer_key        : process.env.TWITTER_CONSUMER_KEY,
    consumer_secret     : process.env.TWITTER_CONSUMER_SECRET,
    access_token        : process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret : process.env.TWITTER_ACCESS_TOKEN_SECRET
  },
  vimeo   : {
    clientId     : process.env.VIMEO_CLIENT_ID,
    clientSecret : process.env.VIMEO_CLIENT_SECRET,
    accessToken  : process.env.VIMEO_ACCESS_TOKEN
  },
  youtube : {
    token : process.env.YOUTUBE_TOKEN
  }
};
