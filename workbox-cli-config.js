module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['*.{html,css,png,jpg,gif,woff,woff2,js}'],
  swDest: 'build/sw.js',
  globIgnores: [
    '../workbox-cli-config.js'
  ]
}
