import React, { FunctionComponent, useState } from 'react'
import { useRouter } from 'next/router'
import ReCAPTCHA from 'react-google-recaptcha'
import { useMutation } from '@apollo/client'
import * as yup from 'yup'
import { useFormik } from 'formik'
import clsx from 'clsx'

import { Button, Input } from '@ui/index'
import RESET_PASSWORD from '@graphql/mutations/ResetPassword'

import { useStyles } from '../ResetPassword/ResetPassword.styles'

interface IForgotPasswordProps {
  email: string
  password: string
  passwordConfirmation: string
  code: string
}

const ForgotPasswordForm: FunctionComponent = () => {
  const classes = useStyles()
  const router = useRouter()
  const code = router.query?.code
  const [error, setError] = useState<string>('')
  const [captchaToken, setCaptchaToken] = useState<string>('')
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState<
    boolean
  >(false)
  const [resetPassword] = useMutation(RESET_PASSWORD)

  const handleIconPasswordClick = () => {
    setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible)
  }

  const handleIconConfirmPasswordClick = () => {
    setIsPasswordConfirmVisible(
      (isPasswordConfirmVisible) => !isPasswordConfirmVisible
    )
  }

  const initialValues: IForgotPasswordProps = {
    email: '',
    password: '',
    passwordConfirmation: '',
    code: '',
  }

  const handleCaptcha = (value) => setCaptchaToken(value)

  const passwordValidationSchema = yup.object({
    password: yup
      .string()
      .min(6, 'Минимальная длина пароля - 6 символов')
      .required('Пароль обязателен для заполнения'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], 'Пароли должны совпадать')
      .required('Подтвердите пароль'),
  })

  const passwordHandleSubmit = async (values) => {
    if (captchaToken.length) {
      try {
        const { data } = await resetPassword({
          variables: {
            code: code,
            password: values.password,
            passwordConfirmation: values.passwordConfirmation,
          },
        })
        console.log(data)
      } catch (e) {
        setError(e.message)
      }
    } else {
      setError('Выполните капчу')
    }
  }

  const passwordFormik = useFormik({
    initialValues: initialValues,
    validationSchema: passwordValidationSchema,
    onSubmit: passwordHandleSubmit,
  })

  return (
    <form onSubmit={passwordFormik.handleSubmit}>
      {error && <p className={classes.error}>{error}</p>}
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
          passwordFormik.touched.password &&
          Boolean(passwordFormik.errors.password)
            ? clsx(classes.input, classes.error)
            : classes.input
        }
        value={passwordFormik.values.password}
        onChange={passwordFormik.handleChange}
        error={
          passwordFormik.touched.password &&
          Boolean(passwordFormik.errors.password)
        }
        helperText={
          passwordFormik.touched.password
            ? passwordFormik.errors.password
            : undefined
        }
      />
      <Input
        id="passwordConfirmation"
        type={isPasswordConfirmVisible ? 'text' : 'password'}
        label="Повторите пароль"
        name="passwordConfirmation"
        variant="outlined"
        icon={isPasswordConfirmVisible ? 'visibilityOff' : 'visibility'}
        onIconClick={handleIconConfirmPasswordClick}
        fullWidth
        className={
          passwordFormik.touched.passwordConfirmation &&
          Boolean(passwordFormik.errors.passwordConfirmation)
            ? clsx(classes.input, classes.error)
            : classes.input
        }
        value={passwordFormik.values.passwordConfirmation}
        onChange={passwordFormik.handleChange}
        error={
          passwordFormik.touched.passwordConfirmation &&
          Boolean(passwordFormik.errors.passwordConfirmation)
        }
        helperText={
          passwordFormik.touched.passwordConfirmation
            ? passwordFormik.errors.passwordConfirmation
            : undefined
        }
      />
      <ReCAPTCHA
        onChange={handleCaptcha}
        sitekey="6Lft4OwZAAAAACOwXs2stnxycUPTG9xrt5U6raK_"
        className={classes.input}
      />
      <Button type="submit" fullWidth className={classes.button}>
        Изменить пароль
      </Button>
    </form>
  )
}

export default ForgotPasswordForm
