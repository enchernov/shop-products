import React, { FunctionComponent, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useMutation } from '@apollo/client'
import * as yup from 'yup'
import { useFormik } from 'formik'
import clsx from 'clsx'

import { Button, Input } from '@ui/index'
import FORGOT_PASSWORD from '@graphql/mutations/ForgotPassword'

import { useStyles } from '../ResetPassword/ResetPassword.styles'

interface IForgotPasswordProps {
  email: string
  password: string
  passwordConfirmation: string
  code: string
}

const ResetPasswordForm: FunctionComponent<any> = ({
  setEmail,
  setFormikEmailData,
}) => {
  const classes = useStyles()
  const [error, setError] = useState<string>('')
  const [captchaToken, setCaptchaToken] = useState<string>('')
  const [forgotPassword] = useMutation(FORGOT_PASSWORD)

  const initialValues: IForgotPasswordProps = {
    email: '',
    password: '',
    passwordConfirmation: '',
    code: '',
  }

  const handleCaptcha = (value) => setCaptchaToken(value)

  const emailValidationSchema = yup.object({
    email: yup
      .string()
      .email('Введите корректный email')
      .required('Email обязателен для заполнения'),
  })

  const emailHandleSubmit = async (values) => {
    if (captchaToken.length) {
      try {
        const { data } = await forgotPassword({
          variables: {
            email: values.email,
          },
        })
        setEmail(data.forgotPassword.ok)
        setFormikEmailData(values.email)
      } catch (e) {
        setError(e.message)
      }
    } else {
      setError('Выполните капчу')
    }
  }

  const emailFormik = useFormik({
    initialValues: initialValues,
    validationSchema: emailValidationSchema,
    onSubmit: emailHandleSubmit,
  })

  return (
    <form onSubmit={emailFormik.handleSubmit}>
      {error && <p className={classes.error}>{error}</p>}
      <Input
        id="email"
        type="email"
        label="Email"
        name="email"
        variant="outlined"
        fullWidth
        className={
          emailFormik.touched.email && Boolean(emailFormik.errors.email)
            ? clsx(classes.input, classes.error)
            : classes.input
        }
        value={emailFormik.values.email}
        onChange={emailFormik.handleChange}
        error={emailFormik.touched.email && Boolean(emailFormik.errors.email)}
        helperText={
          emailFormik.touched.email ? emailFormik.errors.email : undefined
        }
      />
      <ReCAPTCHA
        onChange={handleCaptcha}
        sitekey="6Lft4OwZAAAAACOwXs2stnxycUPTG9xrt5U6raK_"
        className={classes.input}
      />
      <Button type="submit" fullWidth className={classes.button}>
        Восстановить доступ
      </Button>
    </form>
  )
}

export default ResetPasswordForm
