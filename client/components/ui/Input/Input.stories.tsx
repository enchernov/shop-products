import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'

import Input from './index'
import { IInputProps } from './Input'

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
      defaultValue: 'Text input',
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
      defaultValue: 'text_input',
    },
    name: {
      control: {
        type: 'text',
      },
      defaultValue: 'simple_text_input',
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
        options: ['text', 'password', 'email'],
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
  },
} as Meta

const Template: Story<IInputProps> = (args) => (
  <Input onChange={action('changed')} {...args} />
)

export const Text = Template.bind({})
Text.args = {
  value: 'Text',
  id: 'text',
  label: 'Text input',
  name: 'simple_text_input',
  type: 'text',
}

export const Password = Template.bind({})
Password.args = {
  value: 'My password',
  id: 'password',
  label: 'Пароль',
  name: 'password_input',
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
