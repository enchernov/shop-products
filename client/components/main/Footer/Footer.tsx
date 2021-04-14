import React, { FunctionComponent, useCallback, useContext } from 'react'
import { Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { IconButton, Link, Input, Button } from '@ui/index'

import { useStyles } from './Footer.styles'
import { IconType } from '@ui/IconButton/IconButton'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { errorMessage } from '@hooks/auth/errorMessage'
import { useSnackbar } from 'notistack'
import { AppContext } from '@providers/AppProvider'
import { useMutation } from '@apollo/client'
import CREATE_EMAIL_SUBSCRIBER from '@graphql/mutations/CreateEmailSubscriber.ts'
import { subscribeEmail, unsubscribeEmail } from '@utils/account'
import DELETE_EMAIL_SUBSCRIBER from '@graphql/mutations/DeleteEmailSubscriber'

const social: Array<{ icon: IconType; link: string }> = [
  { icon: 'facebook', link: '/#' },
  { icon: 'linkedIn', link: '/#' },
  { icon: 'twitter', link: '/#' },
  { icon: 'instagram', link: '/#' },
  { icon: 'pinterest', link: '/#' },
]

const Footer: FunctionComponent = () => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { state, dispatch } = useContext(AppContext)
  const [createEmailSubscriber] = useMutation(CREATE_EMAIL_SUBSCRIBER)
  const [deleteEmailSubscriber] = useMutation(DELETE_EMAIL_SUBSCRIBER)

  const handleSubscribe = useCallback(
    async (values) => {
      enqueueSnackbar('Пожалуйста, подождите', { variant: 'info' })
      try {
        const data = await subscribeEmail(
          dispatch,
          createEmailSubscriber,
          state.user,
          values.email
        )
        if (!data.createEmailSubscriber) {
          enqueueSnackbar(errorMessage(data), {
            variant: 'error',
          })
        } else {
          enqueueSnackbar('Подписка подтверждена', {
            variant: 'success',
          })
        }
      } catch (error) {
        enqueueSnackbar(errorMessage(error), {
          variant: 'error',
        })
      }
    },
    [createEmailSubscriber, dispatch, enqueueSnackbar, state.user]
  )
  const handleUnsubscribe = useCallback(async () => {
    enqueueSnackbar('Пожалуйста, подождите', { variant: 'info' })
    try {
      const data = await unsubscribeEmail(
        dispatch,
        deleteEmailSubscriber,
        state.user,
        state.user?.email_subscriber?.id
      )
      if (!data.deleteEmailSubscriber) {
        enqueueSnackbar(errorMessage(data), {
          variant: 'error',
        })
      } else {
        enqueueSnackbar('Подписка отменена', {
          variant: 'success',
        })
      }
    } catch (error) {
      enqueueSnackbar(errorMessage(error), {
        variant: 'error',
      })
    }
  }, [deleteEmailSubscriber, dispatch, enqueueSnackbar, state.user])

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Введите корректный email')
      .required('Email обязателен для заполнения'),
  })

  const formik = useFormik({
    initialValues: {
      email: state.user?.email || '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubscribe,
    validateOnMount: false,
  })

  const theme = useTheme()
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))
  const xsWidth = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Grid
      container
      justify={isSmallWidth ? 'flex-start' : 'space-between'}
      className={classes.root}
      style={
        isSmallWidth
          ? { padding: 40, marginBottom: '.1rem' }
          : { padding: '40px 120px' }
      }
      alignItems={isSmallWidth ? 'center' : 'flex-start'}
      direction={isSmallWidth ? 'column' : 'row'}
      spacing={isSmallWidth ? 3 : 0}
    >
      <Grid item xs={isSmallWidth ? 12 : 4}>
        <Grid container direction={'column'} alignItems={'center'} spacing={2}>
          <Grid item>
            <Typography variant={'h3'} className={classes.heading}>
              Подпишитесь на новости
            </Typography>
          </Grid>
          <Grid item>
            {state.user?.email_subscriber ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                className={classes.form}
                style={
                  xsWidth
                    ? {
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }
                    : {}
                }
              >
                <Input
                  id="email_unsubscribe"
                  type="email"
                  label="Ваш Email"
                  name="email"
                  variant="outlined"
                  value={state.user?.email_subscriber.email}
                  className={classes.subscribeInput}
                />
                <Button
                  className={classes.subscribeButton}
                  onClick={handleUnsubscribe}
                  style={
                    xsWidth
                      ? {
                          width: 200,
                          marginTop: 12,
                        }
                      : {}
                  }
                >
                  Отписаться
                </Button>
              </form>
            ) : (
              <form
                onSubmit={formik.handleSubmit}
                className={classes.form}
                style={
                  xsWidth
                    ? {
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }
                    : {}
                }
              >
                <Input
                  id="email"
                  type="email"
                  label="Ваш Email"
                  name="email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className={classes.subscribeInput}
                />
                <Button
                  className={classes.subscribeButton}
                  onClick={formik.handleSubmit}
                  style={
                    xsWidth
                      ? {
                          width: 200,
                          marginTop: 12,
                        }
                      : {}
                  }
                >
                  Подписаться
                </Button>
              </form>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={isSmallWidth ? 12 : 4}>
        <Grid container direction={'column'} alignItems={'center'} spacing={2}>
          <Grid item>
            <Typography variant={'h3'} className={classes.heading}>
              Свяжитесь с нами
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              {social.map((x, index) => (
                <Grid item key={index}>
                  <Link href={x.link} className={classes.link}>
                    <IconButton icon={x.icon as IconType} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={isSmallWidth ? 12 : 4}>
        <Grid container direction={'column'} alignItems={'center'} spacing={2}>
          <Grid item>
            <Typography variant={'h3'} className={classes.heading}>
              Загрузите приложение
            </Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              spacing={2}
              direction={xsWidth ? 'column' : 'row'}
              alignItems={'center'}
            >
              <Grid item>
                <img
                  src="/images/main/apps/app-store.png"
                  alt="App Store"
                  className={classes.app}
                />
              </Grid>
              <Grid item>
                <img
                  src="/images/main/apps/google.png"
                  alt="Google Play"
                  className={classes.app}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Footer
