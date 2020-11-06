import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import ResetPassword from './index'

export default {
  title: 'auth/ResetPassword',
  component: ResetPassword,
} as Meta

const Template: Story = (args) => <ResetPassword {...args} />

export const ResetPasswordForm = Template.bind({})
