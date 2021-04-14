import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as yup from 'yup'
import clsx from 'clsx'
import { useSnackbar } from 'notistack'

import { Button, Link, Input } from '@ui/index'
import { ILoginProps, ILoginMutationProps } from '@interfaces/auth'
import SocialAuth from '../SocialAuth'
import { AppContext } from '@providers/AppProvider'
import { loginUser, logoutUser } from '@utils/auth'
import LOGIN_USER from '@graphql/mutations/LoginUser'
import { errorMessage } from '@hooks/auth/errorMessage'

import { useStyles } from './Login.styles'

const Login: FunctionComponent = () => {
  const classes = useStyles()
  const router = useRouter()
  const { state, dispatch } = useContext(AppContext)
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [login] = useMutation<ILoginMutationProps>(LOGIN_USER)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    router.prefetch('/my-account')
  }, [])

  const handleIconClick = () => {
    setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible)
  }

  const handleSubmit = useCallback(async (values) => {
    try {
      const data = await loginUser(dispatch, login, values)
      // console.log(data)
      if (!data.user) {
        logoutUser(dispatch)
        enqueueSnackbar(errorMessage(data), {
          variant: 'error',
        })
      } else {
        enqueueSnackbar('Успешный вход', { variant: 'success' })
        router.push('/my-account')
      }
    } catch (error) {
      console.log(error)
      enqueueSnackbar(errorMessage(error), { variant: 'error' })
    }
  }, [])

  const initialValues: ILoginProps = {
    identifier: '',
    password: '',
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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
    validateOnMount: true,
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
                <Button
                  type="submit"
                  disabled={!formik.isValid || state.loading}
                  fullWidth
                  className={classes.button}
                >
                  {!state.loading ? 'Войти' : 'Загрузка'}
                </Button>
                <Link href={'/reset'}>Забыли пароль?</Link>
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
