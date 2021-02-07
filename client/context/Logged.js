import { createContext, useEffect, useState } from 'react'

export const LoggedContext = createContext()

export const LoggedProvider = ({children}) => {
  const [logged, setLogged] = useState({logged: '', data: ''})
  
  useEffect(() => {
    fetch('/api/auth/authenticated')
    .then(data => data.json())
    .then(json => {
      if(json.success){
        setLogged({logged: true, data: json.data})
      }else{
        setLogged({logged: false, data: ''})
      }
    })
  }, [])
  
  return <LoggedContext.Provider value={[logged, setLogged]}>
    {children}
  </LoggedContext.Provider>
}