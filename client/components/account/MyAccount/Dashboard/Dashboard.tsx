import React, { ChangeEvent, FunctionComponent, useContext } from 'react'
import LinkIcon from '@material-ui/icons/Link'
import { useMutation } from '@apollo/client'

import { Avatar, Badge, IconButton } from '@ui/index'
import UPLOAD from '@graphql/mutations/Upload'
import { AppContext } from '@providers/AppProvider'

import { useStyles } from './Dashboard.styles'
import { loadAvatar } from '@actions/auth'

const Dashboard: FunctionComponent = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(AppContext)
  const [upload] = useMutation(UPLOAD)

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
      const { data } = await upload({
        variables: fileData,
      })
      if (data) dispatch(loadAvatar(data.upload.url))
      else return
    }
  }

  return (
    <>
      <Badge
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
            <label htmlFor="icon-button-file">
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
          src={state.avatar}
        >
          {state.user?.username[0].toUpperCase()}
        </Avatar>
      </Badge>
    </>
  )
}

export default Dashboard
