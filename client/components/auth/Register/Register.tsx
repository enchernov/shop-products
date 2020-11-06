import React, { FunctionComponent, useState, useRef } from 'react'
import { Paper, Grid } from '@material-ui/core'

import Link from '../../ui/Link'
import Input from '../../ui/Input'
import Button from '../../ui/Button'

import { useStyles } from './Register.styles'

const Register: FunctionComponent = () => {
  const classes = useStyles()

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const registerForm = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
  }

  const handleIconClick = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <Grid
      container
      direction={'column'}
      alignItems={'center'}
      justify={'space-between'}
    >
      <Grid item className={classes.container}>
        <Paper className={classes.formPaper} elevation={1}>
          <Grid
            container
            direction={'column'}
            alignItems={'center'}
            justify={'space-between'}
          >
            <Grid item>
              <h2 className={classes.heading}>Регистрация</h2>
            </Grid>

            <Grid item>
              <form
                className={classes.form}
                ref={registerForm}
                onSubmit={handleSubmit}
              >
                <Input
                  id={'email_input'}
                  type={'email'}
                  required
                  label={'Email'}
                  name={'email_input'}
                  variant={'outlined'}
                  fullWidth
                  className={classes.input}
                />
                <Input
                  id={'password_input'}
                  type={isPasswordVisible ? 'text' : 'password'}
                  required
                  label={'Пароль'}
                  name={'password_input'}
                  variant={'outlined'}
                  icon={isPasswordVisible ? 'visibilityOff' : 'visibility'}
                  onIconClick={handleIconClick}
                  fullWidth
                  className={classes.input}
                />
                <Button type="submit" fullWidth className={classes.button}>
                  Зарегистрироваться
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item className={classes.container}>
        <Paper className={classes.loginPaper} elevation={1}>
          <Grid container justify={'center'} alignContent={'center'}>
            <Grid item>
              Уже зарегистрированы? <Link href={'/login'}>Войдите</Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Register
