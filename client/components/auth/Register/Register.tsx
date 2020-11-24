import React, { FunctionComponent, useState } from 'react'
import { Paper, Grid, Typography } from '@material-ui/core'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as yup from 'yup'
import clsx from 'clsx'

import Link from '@ui/Link'
import Input from '@ui/Input'
import Button from '@ui/Button'
import SocialAuth from '../SocialAuth'

import REGISTER_USER from '@graphql/mutations/RegisterUser'

import { useStyles } from './Register.styles'

// import { useErrorMessage } from '@hooks/auth/useErrorMessage'

interface IRegisterProps {
  username: string
  email: string
  password: string
  passwordConfirm: string
}

const Register: FunctionComponent = () => {
  const classes = useStyles()

  const [error, setError] = useState<string>('')
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState<
    boolean
  >(false)

  const [register] = useMutation<IRegisterProps>(REGISTER_USER)

  const handleIconPasswordClick = () => {
    setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible)
  }

  const handleIconConfirmPasswordClick = () => {
    setIsPasswordConfirmVisible(
      (isPasswordConfirmVisible) => !isPasswordConfirmVisible
    )
  }

  const initialValues: IRegisterProps = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }

  const validationSchema = yup.object({
    username: yup.string().required('Логин обязателен для заполнения'),
    email: yup
      .string()
      .email('Введите корректный email')
      .required('Email обязателен для заполнения'),
    password: yup
      .string()
      .min(6, 'Минимальная длина пароля - 6 символов')
      .required('Пароль обязателен для заполнения'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], 'Пароли должны совпадать')
      .required('Подтвердите пароль'),
  })

  const handleSubmit = async (values) => {
    await register({
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
    <Grid container direction="column" alignItems="center" justify="center">
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
                Регистрация
              </Typography>
            </Grid>
            <Grid item>
              <form onSubmit={formik.handleSubmit}>
                {error && <p className={classes.error}>{error}</p>}
                <Input
                  id="username"
                  type="text"
                  label="Введите логин"
                  name="username"
                  variant="outlined"
                  fullWidth
                  className={
                    formik.touched.username && Boolean(formik.errors.username)
                      ? clsx(classes.input, classes.input_error)
                      : classes.input
                  }
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={
                    formik.touched.username ? formik.errors.username : undefined
                  }
                />
                <Input
                  id="email"
                  type="email"
                  label="Введите email"
                  name="email"
                  variant="outlined"
                  fullWidth
                  className={
                    formik.touched.email && Boolean(formik.errors.email)
                      ? clsx(classes.input, classes.input_error)
                      : classes.input
                  }
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={
                    formik.touched.email ? formik.errors.email : undefined
                  }
                />
                <Input
                  id="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  label="Введите пароль"
                  name="password"
                  variant="outlined"
                  icon={isPasswordVisible ? 'visibilityOff' : 'visibility'}
                  onIconClick={handleIconPasswordClick}
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
                <Input
                  id="passwordConfirm"
                  type={isPasswordConfirmVisible ? 'text' : 'password'}
                  label="Повторите пароль"
                  name="passwordConfirm"
                  variant="outlined"
                  icon={
                    isPasswordConfirmVisible ? 'visibilityOff' : 'visibility'
                  }
                  onIconClick={handleIconConfirmPasswordClick}
                  fullWidth
                  className={
                    formik.touched.passwordConfirm &&
                    Boolean(formik.errors.passwordConfirm)
                      ? clsx(classes.input, classes.input_error)
                      : classes.input
                  }
                  value={formik.values.passwordConfirm}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.passwordConfirm &&
                    Boolean(formik.errors.passwordConfirm)
                  }
                  helperText={
                    formik.touched.passwordConfirm
                      ? formik.errors.passwordConfirm
                      : undefined
                  }
                />
                <Button type="submit" fullWidth className={classes.button}>
                  Зарегистрироваться
                </Button>
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
        <Paper className={classes.loginPaper} elevation={1} square>
          <Grid container justify="center" alignContent="center">
            <Grid item>
              Уже зарегистрированы? <Link href={'/signin'}>Войдите</Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Register
