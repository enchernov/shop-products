import React, { FunctionComponent, useState, useRef } from 'react'
import { Grid, Paper } from '@material-ui/core'

import Link from '../../ui/Link'
import Input from '../../ui/Input'
import Button from '../../ui/Button'

import { useStyles } from './Login.styles'
import SocialAuth from '../SocialAuth'

const Login: FunctionComponent = () => {
  const classes = useStyles()

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const loginForm = useRef(null)

  const handleIconClick = () => {
    setIsPasswordVisible(isPasswordVisible => !isPasswordVisible)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <Grid
      container
      direction={'column'}
      alignItems={'center'}
      justify={'center'}
    >
      <Grid item className={classes.container}>
        <Paper className={classes.formPaper} elevation={1}>
          <Grid
            container
            direction='column'
            alignItems='center'
            justify='space-between'
          >
            <Grid item>
              <h2 className={classes.heading}>Вход</h2>
            </Grid>
            <Grid item>
              <form
                className={classes.form}
                ref={loginForm}
                onSubmit={handleSubmit}
              >
                <Input
                  id='email'
                  type='email'
                  required
                  label='Введите email'
                  name='email'
                  variant='outlined'
                  fullWidth
                  className={classes.input}
                />
                <Input
                  id='password'
                  type={isPasswordVisible ? 'text' : 'password'}
                  required
                  label='Введите пароль'
                  name='password'
                  variant='outlined'
                  icon={isPasswordVisible ? 'visibilityOff' : 'visibility'}
                  onIconClick={handleIconClick}
                  fullWidth
                  className={classes.input}
                />
                <Button type="submit" fullWidth className={classes.button}>
                  Войти
                </Button>
                <Link href={'/auth/reset'}>Забыли пароль?</Link>
              </form>
            </Grid>
            <Grid item>
              <h3 className={classes.heading}>
                Или войдите с помощью сервисов
              </h3>
            </Grid>
            <SocialAuth />
          </Grid>
        </Paper>
      </Grid>
      <Grid item className={classes.container}>
        <Paper className={classes.registerPaper} elevation={1}>
          <Grid container justify='center' alignContent='center'>
            <Grid item>
              Ещё нет аккаунта? <Link href={'/auth/signup'}>Зарегистрируйтесь</Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Login
