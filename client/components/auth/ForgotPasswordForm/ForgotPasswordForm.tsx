import React, {
  createRef,
  FunctionComponent,
  useCallback,
  useContext,
  useState,
} from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { Button, Input } from '@ui/index'
import {
  IForgotPasswordProps,
  IForgotPasswordMutationProps,
  IForgotProps,
} from '@interfaces/auth'
import { AppContext } from '@providers/AppProvider'
import FORGOT_PASSWORD from '@graphql/mutations/ForgotPassword'
import { errorMessage } from '@hooks/auth/errorMessage'
import { forgotPasswordUser } from '@utils/auth'
import { useSnackbar } from 'notistack'

import { useStyles } from './ForgotPasswordForm.styles'
import clsx from 'clsx'

const ForgotPasswordForm: FunctionComponent<IForgotProps> = ({
  setEmailData,
  setFormikEmailData,
}) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { state, dispatch } = useContext(AppContext)
  const [forgotPassword] = useMutation<IForgotPasswordMutationProps>(
    FORGOT_PASSWORD
  )
  const recaptchaRef = createRef<any>()
  const [captchaToken, setCaptchaToken] = useState<string>('')

  const initialValues: IForgotPasswordProps = {
    email: '',
  }

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Введите корректный email')
      .required('Email обязателен для заполнения'),
  })

  const handleSubmit = useCallback(
    async (values: IForgotPasswordProps) => {
      // console.log(captchaToken)
      if (captchaToken.length) {
        try {
          const data = await forgotPasswordUser(
            dispatch,
            forgotPassword,
            values
          )
          if (!data.ok) {
            enqueueSnackbar(errorMessage(data), {
              variant: 'error',
            })
          } else {
            setEmailData(data.ok)
            setFormikEmailData(values.email)
          }
        } catch (error) {
          enqueueSnackbar(errorMessage(error), {
            variant: 'error',
          })
        }
      } else {
        enqueueSnackbar('Введите капчу', {
          variant: 'error',
        })
      }
    },
    [
      setEmailData,
      setFormikEmailData,
      captchaToken,
      dispatch,
      enqueueSnackbar,
      forgotPassword,
    ]
  )

  const handleCaptcha = (value) => {
    setCaptchaToken(value)
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
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
      <ReCAPTCHA
        ref={recaptchaRef}
        onChange={handleCaptcha}
        sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SECRET_KEY}
        className={classes.input}
      />
      <Button
        type="submit"
        disabled={state.loading && !formik.isValid}
        fullWidth
        className={classes.button}
      >
        {!state.loading ? 'Восстановить доступ' : 'Загрузка'}
      </Button>
    </form>
  )
}

export default ForgotPasswordForm
