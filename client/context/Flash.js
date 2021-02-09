import { createContext, useState } from "react";
import FlashMessage from '../components/shared/FlashMessage'

export const FlashContext = createContext()

export const FlashProvider = ({children}) => {
  const [flash, setFlash] = useState({active: false, success: undefined, message: undefined})
  
  return <FlashContext.Provider value={[flash, setFlash]}>
    {
      flash.active
      ?<FlashMessage message={flash.message} success={flash.success} setFlash={setFlash} stateContent={{active: false, success: undefined, message: undefined}} />
      :<></>
    }
    {children}
  </FlashContext.Provider>
}