import React, { ChangeEvent, FunctionComponent, useContext } from 'react'
import LinkIcon from '@material-ui/icons/Link'
import { useMutation } from '@apollo/client'
import { CircularProgress, Grid, Typography } from '@material-ui/core'

import { Avatar, Badge, Button, IconButton } from '@ui/index'

import UPLOAD from '@graphql/mutations/Upload'
import DELETE_FILE from '@graphql/mutations/DeleteFile'

import { AppContext } from '@providers/AppProvider'

import { useStyles } from './Dashboard.styles'

import { loadAvatar, requestAuth, stopLoading } from '@actions/auth'
import { delAvatar } from '@utils/account'
import { Skeleton } from '@material-ui/lab'

const Dashboard: FunctionComponent = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(AppContext)
  const [upload] = useMutation(UPLOAD)
  const [deleteFile] = useMutation(DELETE_FILE)
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as any)[0]
    const fileData = {
      file: file,
      ref: 'user',
      refId: state.user?.id,
      field: 'avatar',
      source: 'users-permissions',
    }
    if (file) {
      try {
        dispatch(requestAuth())
        const { data } = await upload({
          variables: fileData,
        })
        if (data) dispatch(loadAvatar(data.upload))
        else return
      } catch (e) {
        dispatch(stopLoading())
      }
    }
  }

  const removeAvatar = async () => {
    dispatch(requestAuth())
    dispatch(loadAvatar({ url: '', id: '' }))
    // dispatch(
    //   ACTIONS.updateUserSuccess({
    //     ...state.user,
    //     avatar: { url: '', id: '' },
    //   })
    // )
    await delAvatar(deleteFile, state.avatar?.id)
    dispatch(stopLoading())
  }

  return (
    <Grid container direction={'column'} spacing={2} alignItems={'center'}>
      <Grid item>
        <Typography variant={'h3'}>
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
