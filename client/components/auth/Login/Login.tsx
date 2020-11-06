import React, {FunctionComponent, useState, useRef} from 'react'
import { Grid, Paper } from '@material-ui/core'

import Link from '../../ui/Link'
import Input from '../../ui/Input'
import Button from '../../ui/Button'

import { useStyles } from './Login.styles'
// import {AppContext} from "../../../providers/AppProvider";

const Login: FunctionComponent = () => {
  const classes = useStyles()

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const loginForm = useRef(null)
  // const appContext = useContext(AppContext)

  const handleIconClick = () => {
    setIsPasswordVisible(!isPasswordVisible)
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
              <h2 className={classes.heading}>Вход</h2>
            </Grid>
            <Grid item>
              <form
                className={classes.form}
                ref={loginForm}
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
                  Войти
                </Button>
                <Link href={'/reset'} className={classes.link}>
                  Забыли пароль?
                </Link>
              </form>
            </Grid>
            <Grid item>
              <h3 className={classes.heading}>
                Или войдите с помощью сервисов
              </h3>
            </Grid>
            <Grid container justify={'space-between'} alignContent={'center'}>
              <Grid item>facebook</Grid>
              <Grid item>vk</Grid>
              <Grid item>twitter</Grid>
              <Grid item>google</Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item className={classes.container}>
        <Paper className={classes.registerPaper} elevation={1}>
          <Grid container justify={'center'} alignContent={'center'}>
            <Grid item>
              Ещё нет аккаунта?{' '}
              <Link href={'/register'}>Зарегистрируйтесь</Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Login
