import React, {FunctionComponent, useState, useRef, useCallback, useEffect} from 'react'
import { Paper, Grid, Typography } from '@material-ui/core'
import { useMutation } from "@apollo/client"

import Link from '../../ui/Link'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import SocialAuth from '../SocialAuth'
import { useFieldChange } from '../../../hooks/auth/useFieldChange'
import { useErrorMessage } from '../../../hooks/auth/useErrorMessage'

import REGISTER_USER from "../../../graphql/mutations/RegisterUser";

import { useStyles } from './Register.styles'

const Register: FunctionComponent = () => {
  const classes = useStyles()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState(false)
  const [error, setError] = useState('')
  const registerForm = useRef(null)

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [register, result] = useMutation(REGISTER_USER, {
    onError: (error) => {
      setError(useErrorMessage(error.graphQLErrors[0].message))
    }
  })

  useEffect(() => {
      if (result.data) {

      }
  }, [result.data])

  const handleChange = useFieldChange(setRegisterData);

  const mutateRegister = useCallback(() => {
     register({
         variables: {
             registerData
         }
     })
  }, [register, registerData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    mutateRegister()
  }

  const handleIconPasswordClick = () => {
    setIsPasswordVisible(isPasswordVisible => !isPasswordVisible)
  }

  const handleIconConfirmPasswordClick = () => {
    setIsPasswordConfirmVisible(isPasswordConfirmVisible => !isPasswordConfirmVisible)
  }

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justify='center'
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
              <Typography variant="h2" className={classes.heading}>
                Регистрация
              </Typography>
            </Grid>
            <Grid item>
              <form ref={registerForm} onSubmit={handleSubmit}>
                { error && <p className={classes.error}>{error}</p> }
                <Input
                  id='username'
                  type='text'
                  required
                  label='Введите логин'
                  name='username'
                  variant='outlined'
                  fullWidth
                  className={classes.input}
                  value={registerData.username}
                  onChange={handleChange('username')}
                />
                <Input
                  id='email'
                  type='email'
                  required
                  label='Введите email'
                  name='email'
                  variant='outlined'
                  fullWidth
                  className={classes.input}
                  value={registerData.email}
                  onChange={handleChange('email')}
                />
                <Input
                  id='password'
                  type={isPasswordVisible ? 'text' : 'password'}
                  required
                  label='Введите пароль'
                  name='password'
                  variant='outlined'
                  icon={isPasswordVisible ? 'visibilityOff' : 'visibility'}
                  onIconClick={handleIconPasswordClick}
                  fullWidth
                  className={classes.input}
                  value={registerData.password}
                  onChange={handleChange('password')}
                />
                <Input
                  id='passwordConfirm'
                  type={isPasswordConfirmVisible ? 'text' : 'password'}
                  required
                  label='Повторите пароль'
                  name='passwordConfirm'
                  variant='outlined'
                  icon={isPasswordConfirmVisible ? 'visibilityOff' : 'visibility'}
                  onIconClick={handleIconConfirmPasswordClick}
                  fullWidth
                  className={classes.input}
                />
                <Button type="submit" fullWidth className={classes.button}>
                  Зарегистрироваться
                </Button>
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
        <Paper className={classes.loginPaper} elevation={1}>
          <Grid container justify='center' alignContent='center'>
            <Grid item>
              Уже зарегистрированы? <Link href={'/auth/signin'}>Войдите</Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Register
