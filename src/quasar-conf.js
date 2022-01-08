module.exports = function (ctx) {
    extras: [
      ctx.mode.pwa // we're adding only if working on a PWA
        ? 'roboto-font'
        : null
    ]
  }