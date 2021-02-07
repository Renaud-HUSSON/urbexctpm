import { createContext, useEffect, useState } from 'react'

export const LoggedContext = createContext()

export const LoggedProvider = ({children}) => {
  const [logged, setLogged] = useState(false)
  
  useEffect(() => {
    fetch('/api/auth/authenticated')
    .then(data => data.json())
    .then(json => {
      if(json.success){
        console.log(json.success)
        setLogged(true)
      }
    })
  }, [])
  
  return <LoggedContext.Provider value={[logged, setLogged]}>
    {children}
  </LoggedContext.Provider>
}