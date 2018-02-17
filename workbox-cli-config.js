module.exports = {
  globDirectory: 'build/',
  globPatterns: ['*.{html,js}'],
  swDest: 'build/sw.js',
  globIgnores: [
    '../workbox-cli-config.js'
  ]
}
