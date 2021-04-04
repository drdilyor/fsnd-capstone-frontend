const auth = {
  config: {
    domain: 'drdilyor.us.auth0.com',
    clientId: 'Am7VJHw26vNeGonkgD3XbxMBvcqbsxBU',
    audience: 'fsnd-capstone',
  },
  registerRouter(r) {
    r.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!auth.loggedIn()) {
          auth.login()
        } else {
          // Check if user has enough permissions
          let forbidden = false
          for (const record of to.matched) {
            const perm = record.meta.requiresPerm
            if (perm && !auth.can(perm)) {
              forbidden = perm
              break
            }
          }
          if (forbidden) {
            if (confirm("This account doesn't have enough permissions: "
              +forbidden+'. Do you want to log into another account?'))
              auth.login()
          }
          else {
            next()
          }
        }
      } else {
        next() // make sure to always call next()!
      }
    })
    return r
  },

  payload: null,
  inited: false,

  init() {
    const jwt = localStorage.getItem('jwt')
    if (jwt)
      auth.payload = auth.decodeJwt(jwt)
    this.inited = true
  },

  decodeJwt(token) {
    var base64Url = token.split('.')[1]
    var base64 = decodeURIComponent(atob(base64Url).split('').map(
      c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''))
    var result = JSON.parse(base64)

    return result
  },

  setJwt(jwt) {
    try {
      auth.payload = auth.decodeJwt(jwt)
    } catch {
      console.log('failed to decode ' + jwt)
      return false
    }
    localStorage.setItem('jwt', jwt)
    return true
  },
  
  getJwt() {
      return localStorage.getItem('jwt')
  },

  loggedIn() {
    if (!this.inited) this.init()
    return this.payload != null
  },

  login() {
    let callbackUrl = `https://${location.host}/profile`
    window.location = `https://${auth.config.domain}/authorize?audience=${auth.config.audience}&response_type=token&client_id=${auth.config.clientId}&redirect_uri=${callbackUrl}`
  },
  
  logout() {
    localStorage.removeItem('jwt')
    auth.payload = null
  },
  
  logoutHard() {
    auth.logout()
    window.location = `https://${auth.config.domain}/logout`
  },

  can(perm) {
    return auth.loggedIn() && auth.payload.permissions.includes(perm)
  }
}

module.exports = auth
