import React, { FunctionComponent, useState } from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as yup from 'yup'
import clsx from 'clsx'

import Link from '@ui/Link'
import Input from '@ui/Input'
import Button from '@ui/Button'
import SocialAuth from '../SocialAuth'

import LOGIN_USER from '@graphql/mutations/LoginUser'

import { useStyles } from './Login.styles'

// import { useErrorMessage } from '@hooks/auth/useErrorMessage'

interface ILoginProps {
  identifier: string
  password: string
}

const validationSchema = yup.object({
  identifier: yup
    .string()
    .email('Введите корректный email')
    .required('Email обязателен для заполнения'),
  password: yup
    .string()
    .min(6, 'Минимальная длина пароля - 6 символов')
    .required('Пароль обязателен для заполнения'),
})

const Login: FunctionComponent = () => {
  const classes = useStyles()
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  const handleIconClick = () => {
    setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible)
  }

  const [error, setError] = useState<string>('')

  const [login] = useMutation<ILoginProps>(LOGIN_USER)

  const initialValues: ILoginProps = {
    identifier: '',
    password: '',
  }

  const handleSubmit = async (values) => {
    await login({
      variables: {
        input: values,
      },
    })
      .then((data) => console.log(data))
      .catch((error) => {
        setError(error.message)
      })
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <Grid
      container
      direction={'column'}
      alignItems={'center'}
      justify={'center'}
    >
      <Grid item className={classes.container}>
        <Paper className={classes.formPaper} elevation={1} square>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="space-between"
          >
            <Grid item>
              <Typography variant="h2" className={classes.heading}>
                Вход
              </Typography>
            </Grid>
            <Grid item>
              <form className={classes.form} onSubmit={formik.handleSubmit}>
                {error && <p className={classes.error}>{error}</p>}
                <Input
                  id="identifier"
                  type="email"
                  label="Введите email"
                  name="identifier"
                  variant="outlined"
                  fullWidth
                  className={
                    formik.touched.identifier &&
                    Boolean(formik.errors.identifier)
                      ? clsx(classes.input, classes.input_error)
                      : classes.input
                  }
                  value={formik.values.identifier}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.identifier &&
                    Boolean(formik.errors.identifier)
                  }
                  helperText={
                    formik.touched.identifier
                      ? formik.errors.identifier
                      : undefined
                  }
                />
                <Input
                  id="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  label="Введите пароль"
                  name="password"
                  variant="outlined"
                  icon={isPasswordVisible ? 'visibilityOff' : 'visibility'}
                  onIconClick={handleIconClick}
                  fullWidth
                  className={
                    formik.touched.password && Boolean(formik.errors.password)
                      ? clsx(classes.input, classes.input_error)
                      : classes.input
                  }
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={
                    formik.touched.password ? formik.errors.password : undefined
                  }
                />
                <Button type="submit" fullWidth className={classes.button}>
                  Войти
                </Button>
                <Link href={'/reset'}>Забыли пароль?</Link>
              </form>
            </Grid>
            <Grid item>
              <Typography variant="h5" className={classes.serviceHeading}>
                Или войдите с помощью сервисов
              </Typography>
            </Grid>
            <SocialAuth />
          </Grid>
        </Paper>
      </Grid>
      <Grid item className={classes.container}>
        <Paper className={classes.registerPaper} elevation={1} square>
          <Grid container justify="center" alignContent="center">
            <Grid item>
              Ещё нет аккаунта? <Link href={'/signup'}>Зарегистрируйтесь</Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Login
