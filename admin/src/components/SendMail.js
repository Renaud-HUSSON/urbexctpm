import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const SendMail = () => {
  const [open, setOpen] = useState(false);
  const [valid, setValid] = useState(false)
  const [data, setData] = useState({
    header: '',
    body: ''
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setData({
      header: '',
      body: ''
    })
  };

  useEffect(() => {
    if(data.body && data.header){
      setValid(true)
    }else{
      setValid(false)
    }
  }, [data])

  const handleBodyChange = e => {
    setData({
      ...data,
      body: e.target.value
    })
  }

  const handleHeaderChange = e => {
    setData({
      ...data,
      header: e.target.value
    })
  }

  const sendMails = async () => {
    const url = '/api/newsletter/send'

    const res = await fetch(url, {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(data)
    })

    const json = await res.json()

    if(json.success){
      handleClose()
    }
  }

  return (
    <div style={{marginTop: '1rem', paddingLeft: '1rem'}}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Envoyer un mail
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <form>
            <DialogContentText>
              Envoyer un mail aux membres de la newsletter
            </DialogContentText>
            <TextField
              label="En-tête"
              variant="filled"
              onChange={handleHeaderChange}
              style={{width: '100%', padding: '0.5rem'}}
            />
            <TextField 
              label="Contenu" 
              multiline
              rows="15"
              variant="filled"
              onChange={handleBodyChange} 
              style={{width: '100%', resize: 'vertical', borderRadius: '5px', padding: '0.5rem', boxSizing: 'border-box'}}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button disabled={!valid} onClick={sendMails} color="primary">
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SendMail