import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useState,
} from 'react'
import { useMutation } from '@apollo/client'
import { Typography } from '@material-ui/core'
import clsx from 'clsx'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useSnackbar } from 'notistack'

import { Button, Input } from '@ui/index'
import { IUpdateMutationProps, IUpdateProps } from '@interfaces/auth'
import { updateUser } from '@utils/auth'
import { AppContext } from '@providers/AppProvider'
import UPDATE_USER from '@graphql/mutations/UpdateUser'
import { errorMessage } from '@hooks/auth/errorMessage'

import { useStyles } from './Settings.styles'

const Settings: FunctionComponent = () => {
  const { state, dispatch } = useContext(AppContext)
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState<boolean>(
    false
  )
  const [
    isNewPasswordConfirmVisible,
    setIsNewPasswordConfirmVisible,
  ] = useState<boolean>(false)

  const [update] = useMutation<IUpdateMutationProps>(UPDATE_USER)

  const handleIconPasswordClick = () => {
    setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible)
  }

  const handleIconNewPasswordClick = () => {
    setIsNewPasswordVisible((isNewPasswordVisible) => !isNewPasswordVisible)
  }

  const handleIconConfirmNewPasswordClick = () => {
    setIsNewPasswordConfirmVisible(
      (isNewPasswordConfirmVisible) => !isNewPasswordConfirmVisible
    )
  }

  const validationSchema = yup.object({
    username: yup.string().required('Поле не может быть пустым'),
    email: yup
      .string()
      .email('Введите корректный email')
      .required('Поле не может быть пустым'),
    password: yup
      .string()
      .min(6, 'Минимальная длина пароля - 6 символов')
      .required('Введите ваш пароль'),
    newPassword: yup.string().min(6, 'Минимальная длина пароля - 6 символов'),
    newPasswordConfirm: yup
      .string()
      .min(6, 'Минимальная длина пароля - 6 символов')
      .oneOf([yup.ref('newPassword')], 'Пароли должны совпадать'),
  })

  const initialValues: IUpdateProps = {
    username: state.user?.username || '',
    email: state.user?.email || '',
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
  }

  const handleSubmit = useCallback(async (values) => {
    try {
      const data = await updateUser(state, dispatch, update, values)
      if (!data.user) {
        enqueueSnackbar(errorMessage(data), {
          variant: 'error',
        })
      } else {
        enqueueSnackbar('Вы успешно обновились', {
          variant: 'success',
        })
      }
    } catch (error) {
      enqueueSnackbar(errorMessage(error), {
        variant: 'error',
      })
    }
  }, [])

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
    validateOnMount: true,
  })
  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
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
        error={formik.touched.username && Boolean(formik.errors.username)}
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
        helperText={formik.touched.email ? formik.errors.email : undefined}
      />
      <Typography variant="h4" className={classes.passwordLabel}>
        Новый пароль
      </Typography>
      <Input
        id="newPassword"
        type={isNewPasswordVisible ? 'text' : 'password'}
        label="Введите новый пароль"
        name="newPassword"
        variant="outlined"
        icon={isNewPasswordVisible ? 'visibilityOff' : 'visibility'}
        onIconClick={handleIconNewPasswordClick}
        fullWidth
        className={
          formik.touched.newPassword && Boolean(formik.errors.newPassword)
            ? clsx(classes.input, classes.input_error)
            : classes.input
        }
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
        helperText={
          formik.touched.newPassword ? formik.errors.newPassword : undefined
        }
      />
      <Input
        id="newPasswordConfirm"
        type={isNewPasswordConfirmVisible ? 'text' : 'password'}
        label="Повторите новый пароль"
        name="newPasswordConfirm"
        variant="outlined"
        icon={isNewPasswordConfirmVisible ? 'visibilityOff' : 'visibility'}
        onIconClick={handleIconConfirmNewPasswordClick}
        fullWidth
        className={
          formik.touched.newPasswordConfirm &&
          Boolean(formik.errors.newPasswordConfirm)
            ? clsx(classes.input, classes.input_error)
            : classes.input
        }
        value={formik.values.newPasswordConfirm}
        onChange={formik.handleChange}
        error={
          formik.touched.newPasswordConfirm &&
          Boolean(formik.errors.newPasswordConfirm)
        }
        helperText={
          formik.touched.newPasswordConfirm
            ? formik.errors.newPasswordConfirm
            : undefined
        }
      />
      <Typography variant="h4" className={classes.passwordLabel}>
        Старый пароль
      </Typography>
      <Input
        id="password"
        type={isPasswordVisible ? 'text' : 'password'}
        label="Введите старый пароль"
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
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={
          formik.touched.password ? formik.errors.password : undefined
        }
      />
      <Button
        type="submit"
        fullWidth
        className={classes.button}
        disabled={!formik.isValid}
      >
        Сохранить
      </Button>
    </form>
  )
}

export default Settings
