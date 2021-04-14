import React, { FunctionComponent, useContext, useState } from 'react'
import { useStyles } from './Addresses.styles'
import { IconButton, Input } from '@ui/index'
import { Grid, Paper, Typography } from '@material-ui/core'
import { AppContext } from '@providers/AppProvider'
import { useMutation } from '@apollo/client'
import CREATE_ADDRESS from '@graphql/mutations/CreateAddress'
import DELETE_ADDRESS from '@graphql/mutations/DeleteAddress'
import { addAddress, delAddress } from '@utils/account'

const Addresses: FunctionComponent = () => {
  const classes = useStyles()
  const [address, setAddress] = useState<string>('')
  const { state, dispatch } = useContext(AppContext)
  const [createAddress] = useMutation(CREATE_ADDRESS)
  const [deleteAddress] = useMutation(DELETE_ADDRESS)

  const removeAddress = async (id) =>
    await delAddress(state.user, dispatch, deleteAddress, id)

  const newAddress = async () => {
    setAddress('')
    await addAddress(state.user, dispatch, createAddress, address)
  }

  return (
    <Grid container direction={'column'} spacing={2} alignItems={'center'}>
      <Grid item>
        <Typography variant={'h1'}>Адреса</Typography>
      </Grid>
      <Grid item>
        <Input
          className={classes.root}
          label={'Добавьте адрес'}
          variant={'outlined'}
          type={'text'}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          icon={'plus'}
          iconColor={'primary'}
          onIconClick={newAddress}
          iconDisabled={!address.length}
          onKeyPress={async (e) =>
            e.key === 'Enter' ? await newAddress() : null
          }
        />
      </Grid>
      {state?.user?.addresses?.length ? (
        state.user.addresses.map((a) => (
          <Grid item key={a.address}>
            <Paper square={true} className={classes.item}>
              <Grid container justify={'space-between'} alignItems={'center'}>
                <Grid item>{a.address}</Grid>
                <Grid item>
                  <IconButton
                    icon={'cross'}
                    onClick={() => removeAddress(a.id)}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))
      ) : (
        <Grid item>
          <Typography variant={'body1'} paragraph>
            Добавьте ваш первый адрес.
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default Addresses
