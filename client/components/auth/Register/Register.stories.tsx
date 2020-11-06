import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import Register from './index'

export default {
  title: 'auth/Register',
  component: Register,
} as Meta

const Template: Story = (args) => <Register {...args} />

export const RegisterForm = Template.bind({})
