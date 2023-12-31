import { Link as RouterLink } from 'react-router-dom'
import { Button, Grid, TextField, Typography, Link, Alert } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailAndPassword } from '../../store/auth';



const formData = {
  email: 'andres@gmail.com',
  password: '123456',
  displayName: 'Andres',
  photoURL: '',
  birthdate: '',
}

const formValidations = {
  email: [(value) => value.includes('@'), 'el correo debe de tener una @'],
  password: [(value) => value.length > 5, 'la contraseña debe de tener al menos 6 caracteres'],
  displayName: [(value) => value.length > 0, 'el nombre es obligatorio']
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [birthdate, setBirthdate] = useState('');


  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'cheking', [status]);

  const { formState, displayName, email, password, onInputChange, onFileInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid } = useForm(formData, formValidations);


  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailAndPassword({...formState, birthdate}));
  }
  return (
    <AuthLayout title='Crear Cuenta'>
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animated__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Tu nombre aquí"
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="********"
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Fecha de Nacimiento"
              type="date"
              fullWidth
              name='birthdate'
              value={birthdate}
              onChange={({target}) => setBirthdate(target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <input
              accept="image/*"
              id="photo-upload"
              type="file"
              onChange={onFileInputChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="photo-upload">
              <Button
                variant="outlined"
                component="span"
              >
                Cargar Foto de Perfil
              </Button>
            </label>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid
              item
              xs={12}
              display={!!errorMessage ? '' : 'none'}
            >
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>


            <Grid item xs={12} >
              <Button
                disabled={isCheckingAuthentication}
                variant='contained'
                fullWidth
                type='submit'
              >
                Crear cuenta
              </Button>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Ingresar
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
