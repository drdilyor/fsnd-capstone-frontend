import auth from '@/auth'
function required() {
  throw TypeError()
}
const api = {
  backend: 'http://localhost:5000',
  get(...args) {
    return api.request('GET', ...args)
  },
  async request(method=required(), endpoint=required(), body, options) {
    if (endpoint.startsWith('/'))
      endpoint = endpoint.slice(1)

    const fetchArgs = {headers: {}}
    if (body) {
      fetchArgs.body = JSON.stringify(body)
      fetchArgs.headers['Conten-Type'] = 'application/json'
    }
    if (auth.loggedIn())
      fetchArgs.headers.Authorization = `Bearer ${auth.getJwt()}`
    console.log({fetchArgs})
    try {
      const res = await fetch(`${api.backend}/${endpoint}`, Object.assign(fetchArgs, options))
      switch(res.status) {
        case 200:
          console.log('ok')
          break
        case 401:
          // Error with JWT, obtain a new one
          auth.login()
          break
      }
      return res.json()
    }
    catch (e) {
      console.error(e)
      alert("something went wrong")
    }
  },
}

export default api;
