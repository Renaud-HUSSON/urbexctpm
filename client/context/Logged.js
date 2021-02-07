import { createContext, useEffect, useState } from 'react'

export const LoggedContext = createContext()

export const LoggedProvider = ({children}) => {
  const [logged, setLogged] = useState()
  
  useEffect(() => {
    fetch('/api/auth/authenticated')
    .then(data => data.json())
    .then(json => {
      if(json.success){
        setLogged(true)
      }else{
        setLogged(false)
      }
    })
  }, [])
  
  return <LoggedContext.Provider value={[logged, setLogged]}>
    {children}
  </LoggedContext.Provider>
}