import { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const FlashMessage = ({success, message, duration=5000, setFlash, stateContent}) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFlash(stateContent)
      setVisible(false)
    }, duration)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const onClose = useCallback(() => {
    setFlash(stateContent)
    setVisible(false)
  }, [])

  return visible
  ?ReactDOM.createPortal(<div className={success ? 'flash flash--success' : 'flash flash--error'}>
    <div className="flash__close" onClick={onClose}>x</div>
    {message}
  </div>, document.body)
  :<></>
}

export default FlashMessage