module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['*.{html,js}'],
  swDest: 'build/sw.js',
  globIgnores: [
    '../workbox-cli-config.js'
  ]
}
