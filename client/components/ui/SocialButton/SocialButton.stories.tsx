import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'

import { ISocialButtonProps } from './SocialButton'
import SocialButton from './index'
import { useStyles } from './SocialButton.styles'

export default {
  title: 'ui/SocialButton',
  component: SocialButton,
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: ['google', 'vk', 'facebook', 'github'],
      },
    },
  },
} as Meta

const Template: Story<ISocialButtonProps> = (args) => {
  const classes = useStyles()
  return (
    <SocialButton
      onClick={action('clicked')}
      {...args}
      className={classes[args.icon]}
    />
  )
}

export const Google = Template.bind({})
Google.args = {
  icon: 'google',
}

export const VK = Template.bind({})
VK.args = {
  icon: 'vk',
}

export const Facebook = Template.bind({})
Facebook.args = {
  icon: 'facebook',
}

export const Github = Template.bind({})
Github.args = {
  icon: 'github',
}
