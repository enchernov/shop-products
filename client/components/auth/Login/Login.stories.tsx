import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import Login from './index'

export default {
  title: 'auth/Login',
  component: Login,
} as Meta

const Template: Story = (args) => <Login {...args} />

export const LoginForm = Template.bind({})