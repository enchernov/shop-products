import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'

import IconButton from './index'
import { IIconButtonProps } from './IconButton'

export default {
  title: 'ui/IconButton',
  component: IconButton,
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: ['menu', 'more'],
      },
    },
  },
} as Meta

const Template: Story<IIconButtonProps> = (args) => (
  <IconButton onClick={action('clicked')} {...args} />
)

export const Icon = Template.bind({})
Icon.args = {
  icon: 'menu',
}
