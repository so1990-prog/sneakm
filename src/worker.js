export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.hostname === 'sagacity.bz') {
      url.hostname = 'www.sagacity.bz'
      return Response.redirect(url.toString(), 301)
    }
    return env.ASSETS.fetch(request)
  }
}
