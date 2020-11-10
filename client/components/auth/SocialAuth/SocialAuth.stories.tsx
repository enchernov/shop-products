import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'
// import { action } from '@storybook/addon-actions'

import SocialAuth from './index'

export default {
  title: 'auth/SocialAuth',
  component: SocialAuth,
} as Meta

const Template: Story = (args) => <SocialAuth {...args} />

export const Default = Template.bind({})
