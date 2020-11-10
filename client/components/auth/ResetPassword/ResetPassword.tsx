import React, { FunctionComponent, useRef } from 'react'
import { Paper, Grid } from '@material-ui/core'

import Link from '../../ui/Link'
import Input from '../../ui/Input'
import Button from '../../ui/Button'

import { useStyles } from './ResetPassword.styles'

const ResetPassword: FunctionComponent = () => {
  const classes = useStyles()

  const resetPasswordForm = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justify='space-between'
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
              <h2 className={classes.heading}>Восстановление пароля</h2>
            </Grid>
            <Grid item>
              <form
                ref={resetPasswordForm}
                onSubmit={handleSubmit}
              >
                <Input
                  id='email'
                  type='email'
                  required
                  label='Email'
                  name='email'
                  variant='outlined'
                  fullWidth
                  className={classes.input}
                />
                <Button type="submit" fullWidth className={classes.button}>
                  Восстановить доступ
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item className={classes.container}>
        <Paper className={classes.registerPaper} elevation={1}>
          <Grid container justify='center' alignContent='center'>
            <Grid item>
              <Link href={'/login'}>Войти</Link> или{' '}
              <Link href={'/register'}>Зарегистрироваться</Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ResetPassword
