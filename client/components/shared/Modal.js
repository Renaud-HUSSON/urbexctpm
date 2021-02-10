import { createPortal } from 'react-dom' 

const Modal = ({children, modal, setModal}) => {
  const handleClose = e => {
    e.stopPropagation()
    setModal(false)
  }  

  const stopPropagation = e => {
    e.stopPropagation()
  }
  
  return createPortal(<div onClick={handleClose} className={`modal ${modal ? 'modal--opened' : ''}`}>
    <div onClick={stopPropagation} className="modal__content">
      <div className="modal__close" onClick={handleClose}>x</div>
      {children}
    </div>
  </div>, document.body)
}

export default Modal