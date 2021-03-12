import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { Button, Input } from '@ui/index'
import { IResetPasswordProps, IUserDataMutationProps } from '@interfaces/auth'
import { AppContext } from '@providers/AppProvider'
import RESET_PASSWORD from '@graphql/mutations/ResetPassword'
import { errorMessage } from '@hooks/auth/errorMessage'
import { resetPasswordUser } from '@utils/auth'
import { useSnackbar } from 'notistack'

import { useStyles } from './ResetPasswordForm.styles'

const ResetPasswordForm: FunctionComponent = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(AppContext)
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const code = router.query?.code
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<
    boolean
  >(false)
  const [resetPassword] = useMutation<IUserDataMutationProps>(RESET_PASSWORD)

  useEffect(() => {
    router.prefetch('/signin')
  }, [router])

  const handleIconPasswordClick = () => {
    setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible)
  }

  const handleIconConfirmPasswordClick = () => {
    setIsConfirmPasswordVisible(
      (isConfirmPasswordVisible) => !isConfirmPasswordVisible
    )
  }

  const initialValues: IResetPasswordProps = {
    password: '',
    passwordConfirmation: '',
    code: '',
  }

  const validationSchema = yup.object({
    password: yup
      .string()
      .min(6, 'Минимальная длина пароля - 6 символов')
      .required('Пароль обязателен для заполнения'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], 'Пароли должны совпадать')
      .required('Подтвердите пароль'),
  })

  const handleSubmit = useCallback(
    async (values: IResetPasswordProps) => {
      try {
        const data = await resetPasswordUser(
          dispatch,
          resetPassword,
          values,
          code
        )
        if (!data.user) {
          enqueueSnackbar(errorMessage(data), {
            variant: 'error',
          })
        } else {
          enqueueSnackbar('Вы успешно обновили пароль', {
            variant: 'success',
          })
          router.push('/signin')
        }
      } catch (error) {
        enqueueSnackbar(errorMessage(error), {
          variant: 'error',
        })
      }
    },
    [code, dispatch, enqueueSnackbar, resetPassword, router]
  )

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        id="password"
        type={isPasswordVisible ? 'text' : 'password'}
        label="Введите пароль"
        name="password"
        icon={isPasswordVisible ? 'visibilityOff' : 'visibility'}
        onIconClick={handleIconPasswordClick}
        fullWidth
        className={classes.input}
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={
          formik.touched.password ? formik.errors.password : undefined
        }
      />
      <Input
        id="passwordConfirmation"
        type={isConfirmPasswordVisible ? 'text' : 'password'}
        label="Повторите пароль"
        name="passwordConfirmation"
        icon={isConfirmPasswordVisible ? 'visibilityOff' : 'visibility'}
        onIconClick={handleIconConfirmPasswordClick}
        fullWidth
        className={classes.input}
        value={formik.values.passwordConfirmation}
        onChange={formik.handleChange}
        error={
          formik.touched.passwordConfirmation &&
          Boolean(formik.errors.passwordConfirmation)
        }
        helperText={
          formik.touched.passwordConfirmation
            ? formik.errors.passwordConfirmation
            : undefined
        }
      />
      <Button
        type="submit"
        disabled={state.loading && !formik.isValid}
        fullWidth
        className={classes.button}
      >
        {!state.loading ? 'Изменить пароль' : 'Загрузка'}
      </Button>
    </form>
  )
}

export default ResetPasswordForm
