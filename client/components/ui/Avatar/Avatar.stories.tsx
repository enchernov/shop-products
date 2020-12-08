import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import Avatar, { IAvatarProps } from './Avatar'

export default {
  title: 'ui/Avatar',
  component: Avatar,
  argTypes: {
    src: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta

const Template: Story<IAvatarProps> = (args) => <Avatar {...args} />

export const AvatarImage = Template.bind({})
AvatarImage.args = {
  src: 'https://i.pravatar.cc/300',
}

export const AvatarLetter = Template.bind({})
AvatarLetter.args = {
  children: 'E',
}

export const AvatarIcon = Template.bind({})
AvatarIcon.args = {}
