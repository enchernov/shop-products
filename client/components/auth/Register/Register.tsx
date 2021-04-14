import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Paper, Grid, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as yup from 'yup'
import clsx from 'clsx'
import { useSnackbar } from 'notistack'

import { Button, Input, Link } from '@ui/index'
import { IRegisterProps, IRegisterMutationProps } from '@interfaces/auth'
import SocialAuth from '../SocialAuth'
import { registerUser } from '@utils/auth'
import { AppContext } from '@providers/AppProvider'
import REGISTER_USER from '@graphql/mutations/RegisterUser'
import { errorMessage } from '@hooks/auth/errorMessage'

import { useStyles } from './Register.styles'

const Register: FunctionComponent = () => {
  const classes = useStyles()
  const router = useRouter()
  const { state, dispatch } = useContext(AppContext)
  const { enqueueSnackbar } = useSnackbar()
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState<
    boolean
  >(false)
  const [register] = useMutation<IRegisterMutationProps>(REGISTER_USER)

  useEffect(() => {
    router.prefetch('/signin')
  }, [])

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

  const handleSubmit = useCallback(async (values: IRegisterProps) => {
    try {
      const data = await registerUser(dispatch, register, values)
      if (!data.user) {
        enqueueSnackbar(errorMessage(data), {
          variant: 'error',
        })
      } else {
        enqueueSnackbar('Успешная регистрация', { variant: 'success' })
        enqueueSnackbar('Подтвердите email', {
          variant: 'info',
          autoHideDuration: 20000,
        })
        router.push('/signin')
      }
    } catch (error) {
      enqueueSnackbar(errorMessage(error), { variant: 'error' })
    }
  }, [])

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
    validateOnMount: true,
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
                <Button
                  type="submit"
                  disabled={!formik.isValid || state.loading}
                  fullWidth
                  className={classes.button}
                >
                  {!state.loading ? 'Зарегистрироваться' : 'Загрузка'}
                </Button>
              </form>
            </Grid>
            <Grid item>
              <Typography variant="h3" className={classes.serviceHeading}>
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
