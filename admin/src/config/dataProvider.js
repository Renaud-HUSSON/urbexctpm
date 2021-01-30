import simpleRestProvider from 'ra-data-simple-rest';

const dataProvider = simpleRestProvider('/api')

const BASE_URL = '/api/'

const customDataProvider = {
  ...dataProvider,
  getList: async (ressource, params) => {
    const url = `${BASE_URL}${ressource}?page=${params.pagination.page}&limit=${params.pagination.perPage}&order=[["${params.sort.field}", "${params.sort.order}"]]&filter=${JSON.stringify(params.filter)}`
    
    const data = await fetch(url)
    const json = await data.json()
    
    return {
      data: json.data,
      total: json.total
    }
  },
  getOne: async (ressource, params) => {
    const url = `${BASE_URL}${ressource}/${params.id}`
    
    const data = await fetch(url)
    const json = await data.json()
    
    return {
      data: json.data,
    }
  },
  getMany: async (ressource, params) => {
    const url = `${BASE_URL}${ressource}`
    
    const data = await fetch(url)
    const json = await data.json()
    
    return {
      data: json.data,
    }
  },
  create: async (ressource, params) => {
    const form = new FormData()
    for(const item in params.data){
      if(params.data[item].hasOwnProperty('rawFile')){
        form.append(item, params.data[item].rawFile)
      }else{
        form.append(item, params.data[item])
      }
    }

    const request = new Request(`${BASE_URL}${ressource}`, {
      method: 'POST',
      body: form,
      header: new Headers({'Content-Type': 'multipart/form-data'})
    })
    
    const data = await fetch(request)
    const json = await data.json()
    
    return {
      data: json.data,
      message: json.message
    }
  },
  update: async (ressource, params) => {
    const form = new FormData()
    for(const item in params.data){
      if(params.data[item] && params.data[item].hasOwnProperty('rawFile')){
        form.append(item, params.data[item].rawFile)
      }else{
        form.append(item, params.data[item])
      }
    }

    const request = new Request(`${BASE_URL}${ressource}/${params.id}`, {
      method: 'PATCH',
      body: form,
      header: new Headers({'Content-Type': 'multipart/form-data'})
    })
    
    const data = await fetch(request)
    const json = await data.json()
    
    return {
      data: {
        id: json.data
      }
    }
  },
  delete: async (ressource, params) => {
    const request = new Request(`${BASE_URL}${ressource}?id=${params.id}`, {
      method: 'DELETE'
    })

    const data = await fetch(request)
    const json = await data.json()

    return {
      data: {}
    }
  },
  deleteMany: async (ressource, params) => {
    const request = new Request(`${BASE_URL}${ressource}?id=${params.ids}`, {
      method: 'DELETE'
    })

    await fetch(request)

    return {
      data: []
    }
  }
}

export default customDataProvider