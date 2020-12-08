import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'

import Input, { IInputProps } from './Input'

export default {
  title: 'ui/Input',
  component: Input,
  argTypes: {
    value: {
      control: {
        type: 'text',
      },
      defaultValue: 'Text',
    },
    label: {
      control: {
        type: 'text',
      },
      defaultValue: 'Text',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    id: {
      control: {
        type: 'text',
      },
      defaultValue: 'text',
    },
    name: {
      control: {
        type: 'text',
      },
      defaultValue: 'text',
    },
    icon: {
      control: {
        type: 'select',
        options: ['search', 'visibility', 'visibilityOff'],
      },
    },
    type: {
      control: {
        type: 'select',
        options: ['text', 'password', 'email', 'checkbox'],
      },
    },
    variant: {
      control: {
        type: 'select',
        options: ['standard', 'filled', 'outlined'],
      },
    },
    helperText: {
      control: {
        type: 'text',
      },
    },
    error: {
      control: {
        type: 'text',
      },
    },
    checked: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta

const Template: Story<IInputProps> = (args) => (
  <Input onInputChange={action('changed')} {...args} />
)

export const Text = Template.bind({})
Text.args = {
  value: 'text',
  id: 'text',
  label: 'Text',
  name: 'text',
  type: 'text',
}

export const Password = Template.bind({})
Password.args = {
  value: 'password',
  id: 'password',
  label: 'Пароль',
  name: 'password',
  type: 'password',
  icon: 'visibility',
  helperText: 'Введите пароль',
  variant: 'outlined',
}

export const Email = Template.bind({})
Email.args = {
  value: 'awesome@mail.com',
  id: 'email',
  label: 'Email',
  name: 'email',
  type: 'email',
  helperText: 'Введите email',
  variant: 'outlined',
}

export const Checkbox = Template.bind({})
Checkbox.args = {
  label: 'checkbox',
  name: 'checkbox',
  type: 'checkbox',
  checked: false,
}
