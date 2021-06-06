const withCSS = require('@zeit/next-css');

module.exports = withCSS({
    publicRuntimeConfig: {
        APP_NAME: 'SEOBLOG',
        API_DEVELOPMENT: 'http://localhost:8000/api',
        PRODUCTION: false,
        DOMAIN_DEVELOPMENT: 'http://localhost:3000',
        DISQUS_SHORTNAME: 'seoblog-ucno9dvq83',
        GOOGLE_CLIENT_ID: '76720414364-e8auk97b1h9q8d9o5ck58ohiug61ddj1.apps.googleusercontent.com'
    }
})
