module.exports = {
  cdn       : process.env.CDN_URL || '',
  dataDir   : 'data',
  listPages : [ 'articles', 'slides', 'tools', 'videos', 'books' ],
  github    : {
    id    : process.env.GITHUB_ID,
    token : process.env.GITHUB_TOKEN
  },
  platforms : [
    'angular',
    'bookmarklet',
    'chrome',
    'firefox',
    'internetExplorer',
    'safari',
    'mac',
    'windows',
    'linux',
    'cli',
    'module',
    'grunt',
    'gulp',
    'javascript',
    'php',
    'service',
    'wordpress',
    'illustrator'
  ],
  site      : {
    name : 'Performance tooling today'
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
