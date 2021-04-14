import React, {
  ChangeEvent,
  FunctionComponent,
  useContext,
  useEffect,
} from 'react'
import LinkIcon from '@material-ui/icons/Link'
import { useMutation } from '@apollo/client'
import { CircularProgress, Grid, Typography } from '@material-ui/core'

import { Avatar, Badge, Button, IconButton } from '@ui/index'

import UPLOAD from '@graphql/mutations/Upload'
import DELETE_FILE from '@graphql/mutations/DeleteFile'

import { AppContext } from '@providers/AppProvider'

import { useStyles } from './Dashboard.styles'

import { loadAvatar, updateUserSuccess } from '@actions/auth'
import { addAvatar, delAvatar } from '@utils/account'
import { Skeleton } from '@material-ui/lab'
import {IUserDataProps} from "@interfaces/auth";

const Dashboard: FunctionComponent = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(AppContext)
  const [upload] = useMutation(UPLOAD)
  const [deleteFile] = useMutation(DELETE_FILE)

  useEffect(() => {
    state.user?.avatar?.url?.length &&
      !state?.avatar?.url?.length &&
      dispatch(
        loadAvatar({
          url: state?.user?.avatar?.url || '',
          id: state.user?.avatar?.id || '',
        })
      )
  }, [state.avatar, state.user?.avatar, dispatch])

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) =>
    await addAvatar(e, state?.user?.id, dispatch, upload)

  const removeAvatar = async () => {
    await delAvatar(dispatch, deleteFile, state.avatar.id)
    await updateUserSuccess({ ...state.user, avatar: null } as IUserDataProps)
  }

  return (
    <Grid container direction={'column'} spacing={2} alignItems={'center'}>
      <Grid item>
        <Typography variant={'h1'}>
          {state.user ? (
            <>
              Добро пожаловать,&nbsp;
              {state.user?.username} | {state.user?.email}
            </>
          ) : (
            <Skeleton width={200} />
          )}
        </Typography>
      </Grid>
      <Grid item>
        <Badge
          className={classes.badge}
          badgeContent={
            <>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                name={'files'}
                onChange={async (e) => await handleChange(e)}
              />
              <label htmlFor="icon-button-file" className={classes.label}>
                <IconButton
                  disabled={true}
                  aria-label="upload picture"
                  icon="photo"
                  className={classes.icon}
                >
                  <LinkIcon />
                </IconButton>
              </label>
            </>
          }
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Avatar
            variant={'circle'}
            className={classes.avatar}
            src={state.avatar.url || ''}
          >
            {state.loading ? (
              <CircularProgress className={classes.progress} />
            ) : (
              state.user?.username[0].toUpperCase()
            )}
          </Avatar>
        </Badge>
      </Grid>
      {state.avatar.url ? (
        <Grid item>
          <Button variant={'text'} color={'secondary'} onClick={removeAvatar}>
            Удалить аватар
          </Button>
        </Grid>
      ) : null}
    </Grid>
  )
}

export default Dashboard
