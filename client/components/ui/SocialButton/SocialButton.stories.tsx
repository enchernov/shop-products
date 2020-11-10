import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'

import { ISocialButtonProps } from './SocialButton'
import SocialButton from './index'

export default {
  title: 'ui/SocialButton',
  component: SocialButton,
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: ['google', 'vk', 'facebook', 'twitter'],
      },
    },
  },
} as Meta

const Template: Story<ISocialButtonProps> = (args) => (
  <SocialButton onClick={action('clicked')} {...args} />
)

export const Icon = Template.bind({})
Icon.args = {
  icon: 'google',
}
