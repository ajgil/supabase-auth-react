import React, { useCallback, useContext } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { AppContext } from '../Context'

export default function FirstStep() {
  //const { formValues, handleChange, handleNext, variant, margin } = useContext(AppContext)
  const { firstName, lastName, email, gender } = formValues
  const odeFirstNameRef = useRef()
  const odeemailRef = useRef()
  const odepasswordRef = useRef()
  const odePasswordConfirmRef = useRef()
  const odephoneNumberRef = useRef()

  /* Check if all values are not empty and if there are some errors
  const isError = useCallback(
    () =>
      Object.keys({ firstName, lastName, email, gender }).some(
        (name) => (formValues[name].required && !formValues[name].value) || formValues[name].error
      ),
    [formValues, firstName, lastName, email, gender]
  )
  */

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            //variant={variant}
            margin={margin}
            fullWidth
            label='Nombre'
            name='Nombre'
            placeholder='Your first name'
            value={odeFirstNameRef}
            onChange={handleChange}
            //error={!!firstName.error}
            //helperText={firstName.error}
            //required={firstName.required}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            //variant={variant}
            margin={margin}
            fullWidth
            label='Email'
            name='email'
            placeholder='Your email address'
            type='email'
            value={odeemailRef}
            onChange={handleChange}
            //error={!!email.error}
            //helperText={email.error}
            //required={email.required}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            //variant={variant}
            margin={margin}
            fullWidth
            label='password'
            name='Contraseña'
            placeholder='Contraseña'
            type='password'
            value={odepasswordRef}
            onChange={handleChange}
            //error={!!email.error}
            //helperText={email.error}
            //required={email.required}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            //variant={variant}
            margin={margin}
            fullWidth
            label='password'
            name='Contraseña'
            placeholder='Repita Contraseña'
            type='password'
            value={odePasswordConfirmRef}
            onChange={handleChange}
            //error={!!email.error}
            //helperText={email.error}
            //required={email.required}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label='Phone number'
            name='phone'
            placeholder='ejem: 612345678'
            value={odephoneNumberRef}
            onChange={handleChange}
            //error={!!phone.error}
            //helperText={phone.error}
            //required={phone.required}
          />
        </Grid>

      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant='contained'
          sx={{ mt: 3, ml: 1 }}
          disabled={isError()}
          color='primary'
          onClick={!isError() ? handleNext : () => null}
        >
          Next
        </Button>
      </Box>
    </>
  )
}