import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification, defaultTheme } from 'react-admin';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [refresh, setRefresh] = useState(false)
    const login = useLogin();
    const notify = useNotify();
    const submit = e => {
        e.preventDefault();
        login({ email, password, refresh }).catch(() =>
            notify('Invalid email or password')
        );
    };

    return <ThemeProvider theme={createMuiTheme(defaultTheme)}>
      <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <form onSubmit={submit}>
          <TextField
            label="Email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          /><br/>
          <TextField
            label="Mot de passe"
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          /><br/>
          <div style={{display: "flex", alignItems: 'center'}}>
            <Checkbox 
              name="refresh" 
              value={refresh} 
              onChange={() => setRefresh(refresh => !refresh)}
              id="refresh"
              style={{paddingLeft: '0'}}
            />
            <InputLabel htmlFor="refresh">Se souvenir de moi</InputLabel>
          </div>
          <Button variant="contained" color="primary" type="submit">Envoyer</Button>
        </form>
      </div>
      <Notification />
    </ThemeProvider>
};

export default LoginPage;