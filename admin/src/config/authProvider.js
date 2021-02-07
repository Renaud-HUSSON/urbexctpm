const BASE_URL = '/api/auth/'

const authProvider = {
  login: async ({email, password, refresh}) => {
    const request  = new Request(`${BASE_URL}login?role=admin`, {
      method: 'POST',
      body: JSON.stringify({email: email, password, refresh}),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })

    return new Promise(async (resolve, reject) => {
      return fetch(request)
      .then(data => data.json())
      .then(json => {
        if(!json.success){
          return reject({message: json.message})
        }

        return resolve({message: json.message})
      })
    })
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
        return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
},
  checkAuth: (_params) => {
    const request = new Request(`${BASE_URL}authenticated`)

    return new Promise(async (resolve, reject) => {
      const data = await fetch(request)
      const json = await data.json()
      if(!json.success){
        return reject({redirectTo: '/login'})
      }
      
      if(json.data.role !== 'admin'){
        return reject({message: 'Vous n\'êtes pas autorisé à accéder à cette ressource'})
      }
      
      return resolve()
    })
  },
  logout: () => {
    const request = new Request(`${BASE_URL}logout`)

    return new Promise(async (resolve, reject) => {
      try {
        await fetch(request)
        return resolve()
      }catch(_err){
        return reject()
      }
      
    })
  },
  getIdentity: () => {
    return Promise.resolve()
  },
  getPermissions: (_params) => {
    const request = new Request(`${BASE_URL}authorized?role=admin`)    

    return new Promise(async (resolve, reject) => {
      const data = await fetch(request)
      const json = await data.json()

      if(!json.success){
        return reject()
      }

      return resolve()
    })
  }
}

export default authProvider