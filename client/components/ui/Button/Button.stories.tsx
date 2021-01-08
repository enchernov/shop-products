import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'

import Button from './index'
import { IButtonProps } from './Button'

export default {
  title: 'ui/Button',
  component: Button,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      defaultValue: 'Button',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    icon: {
      control: {
        type: 'select',
        options: ['create', 'edit'],
      },
    },
  },
} as Meta

const Template: Story<IButtonProps> = (args) => (
  <Button onClick={action('clicked')} {...args} />
)

export const Text = Template.bind({})
Text.args = {
  children: 'Button',
  disabled: false,
}

export const Icon = Template.bind({})
Icon.args = {
  ...Text.args,
  icon: 'edit',
}

export const Link = Template.bind({})
Link.args = {
  ...Icon.args,
  href: '/',
}
